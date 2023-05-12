import {  useState } from 'react';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchBar.css'

function SearchBar () {
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);
 
    return (
        <div className="searchBar">
            {newRecipes && newRecipes.map((recipe: RecipeCardItem, index) => 
            <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} key= {index} isFav={false} /> )}
        </div>
    );
}

export default SearchBar;