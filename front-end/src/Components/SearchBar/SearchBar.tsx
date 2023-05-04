import { useContext, useEffect, useState } from 'react';
import { getRecipes } from '../../Client/Client';
import { AppContext } from '../../Context/AppContext';
import { RecipeType } from '../../Types/Types';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchBar.css'

function SearchBar () {
    const [recipeFilter, setRecipeFilter] =useState<RecipeType> ({});
    const { recipes, setRecipes} = useContext(AppContext);
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);

    useEffect(()=>{
        const getrecipes = async () => {
            const recipes = await getRecipes(recipeFilter);
            setNewRecipes(recipes.results)
            setRecipes(recipes.results);
        }
        getrecipes();
    },[])
 
    return (
        <div className="searchBar">
            {newRecipes && newRecipes.map((recipe: RecipeCardItem) => <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} /> )}
        </div>
    );
}

export default SearchBar;