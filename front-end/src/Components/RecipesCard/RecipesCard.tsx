import { arrayUnion } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';
import { getUserById, UpdateUserFavRecipes } from '../../Firebase/UserDB';
import { RecipeCardItem } from '../../Types/Types';
import './RecipesCard.css'

function RecipesCard (props : RecipeCardItem) {
    const { title, image, id, isFav} = props;
    const{ user } = UserAuth();
    const navigate = useNavigate();
    const [addMessage, setAddMessage] = useState<string>("");
    const [removeMessage, setRemoveMessage] = useState<string>("");

    const seeInstructions = () => {
        try{
          navigate(`/${id}`)  
        }catch{
            console.error();    
        }
    }
    const adButtonHandler = async() => {
        await UpdateUserFavRecipes(user.uid, {
            favRecipes: arrayUnion( {
                title: title,
                image: image,
                id:id,
                isFav: true,
            })
        })
        setAddMessage("Recipe is added in your favourite recipe list");
        setTimeout(()=>{
            setAddMessage("")
        },1000);
    }

    const removeButtonHandler = async() => {
        const userData= await getUserById(user.uid);
        const arrayOfFavRecipes = userData.favRecipes;
        const indexOfRecipe = arrayOfFavRecipes.findIndex((r : RecipeCardItem) => r.id === id);
        if (indexOfRecipe > -1) {
            arrayOfFavRecipes.splice(indexOfRecipe, 1);
        }
        console.log(arrayOfFavRecipes)
        await UpdateUserFavRecipes(user.uid, {
            favRecipes: arrayOfFavRecipes
        })
        setRemoveMessage("Recipe is removed from you favourite recipe list");
        setTimeout(()=>{
            setRemoveMessage("")
        },1000);
    }

    return (
        <>
        <div className="recipe-card-item">
            <img className= "card-image"  alt="" src={image} onClick={seeInstructions} />
            <h2 className="title"><b>{title}</b></h2>
            {user && <div className='card-header'>
                {!isFav && <p className='add-button' onClick={adButtonHandler}>+</p>}
                {isFav && <p className='add-button' onClick={removeButtonHandler}>-</p>}
            </div>}
        </div>
        {removeMessage && <p className='message-added'>{removeMessage}</p>}
        {addMessage && <p className='message-added'>{addMessage}</p>}
        </>
    );
}

export default RecipesCard;