import { useEffect, useState } from 'react';
import { getRecipes } from '../../Client/Client';
import { RecipeType } from '../../Types/Types';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchBar.css'

function SearchBar () {
    const [recipeFilter, setRecipeFilter] =useState<RecipeType> ({});
    const [recipes, setRecipes] =useState<RecipeCardItem[]>([]);

    useEffect(()=>{
        const getrecipes = async () => {
            const recipes = await getRecipes(recipeFilter);
            setRecipes(recipes.results);
        }
        getrecipes();
    },[])
 
    return (
        <div className="searchBar">
            {recipes && recipes.map((recipe: RecipeCardItem) => <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} /> )}
        </div>
    );
}

export default SearchBar;