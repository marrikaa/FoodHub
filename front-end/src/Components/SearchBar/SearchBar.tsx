import {  useState } from 'react';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchBar.css'

function SearchBar () {
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);

    // useEffect(()=>{
    //     const getrecipes = async () => {
    //         // const recipes = await getRecipes(recipeFilter);
    //         // setNewRecipes(recipes.results)
    //         // setRecipes(recipes.results);
    //         //  setNewRecipes([{
    //         //     title: "string",
    //         //     image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    //         //     id: "string",}])
    //         // setRecipes([{
    //         //     title: "string",
    //         //     image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    //         //     id: "string",}]);
    //     }
    //     getrecipes();
    // },[])
 
    return (
        <div className="searchBar">
            {newRecipes && newRecipes.map((recipe: RecipeCardItem, index) => 
            <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} key= {index} isFav={false} /> )}
        </div>
    );
}

export default SearchBar;