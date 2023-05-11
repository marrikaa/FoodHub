import { useEffect, useState } from 'react';
import { UserAuth } from '../../Context/AuthContext';
import { getUserById } from '../../Firebase/UserDB';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';

function MyFavRecipes () {
    const [recipes, setRecipes] = useState<RecipeCardItem[]>([]);
    const { user } = UserAuth();

    useEffect(()=>{
        const getUserData = async() =>{
            const userData = await getUserById(user.uid)
            setRecipes(userData.favRecipes);
        } 
        getUserData();
        console.log(recipes)
    },[user.uid])

    return (
        <div className="searchBar">
            {recipes && recipes.map((recipe: RecipeCardItem, index) => 
                <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} key= {index} isFav={recipe.isFav} /> )}
        </div>)
}

export default MyFavRecipes;


