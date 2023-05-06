import { useContext, useEffect, useState } from 'react';
import { getRecipes } from '../../Client/Client';
import { AppContext } from '../../Context/AppContext';
import { RecipeType } from '../../Types/Types';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchBar.css'

function SearchBar () {
    const [recipeFilter, setRecipeFilter] =useState<RecipeType> ({number:"1"});
    const { recipes, setRecipes} = useContext(AppContext);
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);

    useEffect(()=>{
        const getrecipes = async () => {
            const recipes = await getRecipes(recipeFilter);
            setNewRecipes(recipes.results)
            setRecipes(recipes.results);
            //  setNewRecipes([{
            //     title: "string",
            //     image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            //     id: "string",}])
            // setRecipes([{
            //     title: "string",
            //     image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            //     id: "string",}]);
        }
        getrecipes();
    },[])
 
    return (
        <div className="searchBar">
            {newRecipes && newRecipes.map((recipe: RecipeCardItem, index) => <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} key= {index} /> )}
        </div>
    );
}

export default SearchBar;