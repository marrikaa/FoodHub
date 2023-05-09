import { arrayUnion } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';
import { createBlog } from '../../Firebase/BlogsDB';
import { getUserById, updateUserBlog } from '../../Firebase/UserDB';
import TextArea from '../Textarea/TextrArea';
import './CreateBlog.css'

const CreateBlog = () => {
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentTitle, setCurrentTitle] = useState("");
    const { user } = UserAuth();

    const saveProject = async () => {
        const userData = await getUserById(user.uid);
        const blogToCreate: any = {
            title: currentTitle,
            description: currentDescription,
            owner: userData.username,
        }
        console.log(user)
        const uid = await createBlog(blogToCreate);
        await updateUserBlog(user.uid, { blogs: arrayUnion(blogToCreate)})
    }

    const changeCurrentDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.currentTarget.value);
    }

    const changeCurrentTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value);
    }

    return (
        <div>
            <div className='create-blog-header'>
                <h1>Create your food blog!</h1>
                <button className="" onClick={saveProject}>Save Project</button>
            </div>
            <h2>Title</h2>
            <input type='text' onChange={changeCurrentTitle} />
            <h2>Description</h2>
            <TextArea canType={true} currentDescription={currentDescription} onTyping={changeCurrentDescription} />
        </div>
    )
}

export default CreateBlog;