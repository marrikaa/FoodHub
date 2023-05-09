import { arrayUnion } from 'firebase/firestore';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';
import { getUserById, UpdateUserFavRecipes } from '../../Firebase/UserDB';
import { RecipeCardItem } from '../../Types/Types';
import './RecipesCard.css'

function RecipesCard (props : RecipeCardItem) {
    const { title, image, id, isFav} = props;
    const{ user } = UserAuth();
    const navigate = useNavigate();

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
    }
    const removeButtonHandler = async() => {
        const userData= await getUserById(user.uid);
        const arrayOfFavRecipes= userData.favRecipes;
        const indexOfRecipe = arrayOfFavRecipes.findIndex((r : RecipeCardItem) => r.id === id);
        if (indexOfRecipe > -1) {
            arrayOfFavRecipes.splice(indexOfRecipe, 1);
        }
        console.log(arrayOfFavRecipes)
        await UpdateUserFavRecipes(user.uid, {
            favRecipes: arrayOfFavRecipes
        })
    }

    return (
        <div className="recipe-card-item" onClick={seeInstructions}>
            <img className= "card-image"  alt="" src={image} />
            <h2 className="title"><b>{title}</b></h2>
            <div className='card-header'>
                <p className='read-more'>Instruction</p>
                {!isFav && <p className='add-button' onClick={adButtonHandler}>+</p>}
                {isFav && <p className='add-button' onClick={removeButtonHandler}>-</p>}
            </div>
        </div>
    );
}

export default RecipesCard;