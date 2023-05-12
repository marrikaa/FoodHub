import { arrayUnion } from 'firebase/firestore';
import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../Context/AuthContext';
import { createBlog, saveBlogsImageAndGetUrl } from '../../../Firebase/BlogsDB';
import { getUserById, updateUserBlog } from '../../../Firebase/UserDB';
import { BlogsNewIngredient } from '../NewIngredientPopUp/BlogsNewIngredient';
import TextArea from '../../Textarea/TextrArea';
import './CreateBlog.css'
import { v4 } from 'uuid';

const CreateBlog = () => {
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentInstruction, setCurrentInstruction] = useState<string[]>([]);
    const [currentTitle, setCurrentTitle] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [ingVisible, setIngVisible] = useState<boolean>(false);
    const [image, setImage] =useState<any>();
    const [imageURL, setImageURL] =useState<any>();
    const { user } = UserAuth();
    const navigate=useNavigate();

    useEffect(()=>{
        if(!image)return;
        const newImageUrl = URL.createObjectURL(image);
        setImageURL(newImageUrl);
    },[image])

    const imageUploadHandler = (event : any) => {
        event.preventDefault();
        setImage(event.target.files![0]);
    }

    const addImageInDB = async() =>{
        console.log(`${image.name}${v4()}`);
        if(!image)return;
        const url = await saveBlogsImageAndGetUrl(`${image.name}${v4()}`, image);
        return url;
    }


    const saveBlog = async () => {
        const imageURL = await addImageInDB();
        const userData = await getUserById(user.uid);
        const blogToCreate: any = {
            title: currentTitle,
            description: currentDescription,
            ingredients: ingredients,
            instruction:currentInstruction,
            owner: userData.username,
            image: imageURL,
        }
        console.log(blogToCreate)
        const uid = await createBlog(blogToCreate);
        await updateUserBlog(user.uid, { blogs: arrayUnion(uid)})
        navigate(`/blogs/${uid}`)
    }

    const changeCurrentDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.currentTarget.value);
    }

    const changeCurrentInstruction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {steps} = event.currentTarget;
        setCurrentInstruction([...currentInstruction, steps.value])
        steps.value = "";
    }

    const changeCurrentTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value);
    }

    const addIngredient = () => {
        setIngVisible(true);
    }

    const removeStep = (index: number) => {
        const tmpSteps = [...currentInstruction];
        tmpSteps.splice(index, 1);
        setCurrentInstruction(tmpSteps);
    }
    const removeIngredients = (index: number) => {
        const tmpIngredients = [...ingredients];
        tmpIngredients.splice(index, 1);
        setIngredients(tmpIngredients);
        
    }


    return (
        <div className='blog-creator'>
            <h1>Create your food blog!</h1>
            <h2>Name</h2>
            <input type='text' className='create-blog-input' onChange={changeCurrentTitle} required/>
            <h2>Description</h2>
            <TextArea canType={true} currentDescription={currentDescription} onTyping={changeCurrentDescription} />
            <h2>Ingredients</h2>
            <div className='blog-ingredients-container'>
                {ingredients?.map((ing, index) => <div key={index} className="ingredients">
                    <p className='each-ingredient'>{ing}</p>
                    <button key={index} onClick={() => removeIngredients(index)} className="step-remove-button">x</button>
                    </div>)}
                <button onClick={addIngredient} className='new-ingredient-button'>+</button>
                {ingVisible && <BlogsNewIngredient setVisible={setIngVisible} setIngredients={setIngredients} ingredients={ingredients} />}
            </div>
            <h2>Instruction</h2>
            <form onSubmit={changeCurrentInstruction}>
                <input type='text' name="steps" className='create-blog-steps-input' required />
            </form>
            {currentInstruction && currentInstruction.map((step, index) => <div className='blog-instruction-steps'>
                <p className='new-steps'>• {step}</p>
                <button key={index} onClick={() => removeStep(index)} className="step-remove-button">x</button>
            </div>)}
            <div><input required type="file" id="file" accept='image/*' onChange={(event)=> imageUploadHandler(event)} />
            <label htmlFor="file" className="upload-button">upload Image</label>
            </div>
            <img className="create-blog-image" src={imageURL} alt="" /> 
            <button className="create-button" onClick={saveBlog}>Save Blog</button>
        </div>
    )
}

export default CreateBlog;