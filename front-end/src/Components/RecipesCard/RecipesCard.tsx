import { arrayUnion } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';
import { getUserById, UpdateUserFavRecipes } from '../../Firebase/UserDB';
import { RecipeCardItem } from '../../Types/Types';
import './RecipesCard.css'

type PropsType = {
    recipe: RecipeCardItem;
    setRecipes? : (recipes: RecipeCardItem[])=>void
}

function RecipesCard (props : PropsType) {
    const{ recipe, setRecipes} = props;
    const{ user } = UserAuth();
    const navigate = useNavigate();
    const [addMessage, setAddMessage] = useState<string>("");
    const [removeMessage, setRemoveMessage] = useState<string>("");

    const seeInstructions = () => {
        try{
          navigate(`/${recipe.id}`)  
        }catch{
            console.error();    
        }
    }
    const adButtonHandler = async() => {
        await UpdateUserFavRecipes(user.uid, {
            favRecipes: arrayUnion( {
                title: recipe.title,
                image: recipe.image,
                id: recipe.id,
                isFav: true,
            })
        })
        setAddMessage("Recipe is added in your favourite recipe list");
        setTimeout(()=>{
            setAddMessage("")
        },1000);
    }

    const checkRemoveRecipe = () =>{
        setRemoveMessage("Do you want to delete this recipe?");
    }

    const removeButtonHandler = async() => {
        const userData= await getUserById(user.uid);
        const arrayOfFavRecipes : RecipeCardItem[]= userData.favRecipes;
        const indexOfRecipe = arrayOfFavRecipes.findIndex((r : RecipeCardItem) => r.id === recipe.id);
        if (indexOfRecipe > -1) {
            arrayOfFavRecipes.splice(indexOfRecipe, 1);
        }
        await UpdateUserFavRecipes(user.uid, {
            favRecipes: arrayOfFavRecipes
        })
        setRecipes!(arrayOfFavRecipes);
        setRemoveMessage("")
    }


    return (
        <>
        <div className="recipe-card-item">
            <img className= "card-image"  alt="" src={recipe.image} onClick={seeInstructions} />
            <h2 className="title"><b>{recipe.title}</b></h2>
            <p className="title">So, whether you're seeking a refined dining experience or a casual 
            meal with friends and family, this dish is the perfect choice. 
            It's a culinary masterpiece that appeals to all, 
            celebrating the art of food and leaving a lasting impression on your taste buds. 
            Bon appétit!</p>
            {user && <div className='card-header'>
                {!recipe.isFav && <p className='add-button' onClick={adButtonHandler}>+</p>}
                {recipe.isFav && <p className='add-button' onClick={checkRemoveRecipe}>-</p>}
            </div>}
        </div>
        {removeMessage && 
              <div className='popUp-container'>
              <div className='ingredients-PopUp'>
                <p>{removeMessage}</p>
                      <div className='pop-up-button-container'>
                          <button  onClick={removeButtonHandler}>Yes</button>
                          <button onClick={()=>setRemoveMessage("")}>No</button>
                      </div>
              </div></div>}
        {addMessage && <p className='message-added'>{addMessage}</p>}
        </>
    );
}

export default RecipesCard;