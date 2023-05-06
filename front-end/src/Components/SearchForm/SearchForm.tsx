import { useContext, useEffect, useState } from 'react';
import { getRecipes } from '../../Client/Client';
import { AppContext } from '../../Context/AppContext';
import { RecipeType } from '../../Types/Types';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchForm.css'

function SearchForm () {
    const [recipeFilter, setRecipeFilter] =useState<RecipeType> ({number:"1"});
    const { recipes, setRecipes} = useContext(AppContext);
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);
    const cousines=["African", "American","British","Cajun", "Caribbean", 
                    "Chinese", "Eastern European","European", "French",
                    "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", 
                    "Korean", "Latin American", "Mediterranean" ,"Mexican", "Middle Eastern",
                    "Nordic",  "Southern", "Spanish", "Thai", "Vietnamese"]
    const diets= ["pescetarian", "lacto vegetarian", "ovo vegetarian", "vegan", "paleo", "primal", "vegetarian"]

    useEffect(()=>{
        const getrecipes = async () => {
            const recipes = await getRecipes(recipeFilter);
            setNewRecipes(recipes.results)
            setRecipes(recipes.results);
        }
        getrecipes();
    },[])

    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { dish, cuisine, excludeCuisine, diet } = event.currentTarget;
        setRecipeFilter({
            query: dish.value,
            cuisine: cuisine.value,
            excludeCuisine: excludeCuisine.value,
            diet: diet.value,
        });
        const getrecipes = async () => {
            const recipes = await getRecipes(recipeFilter);
            setNewRecipes(recipes.results)
            setRecipes(recipes.results);
        }
        getrecipes();
    }
 
    return (
        <div className='searchForm'>
            <form onSubmit={formSubmitted} className='formInput' method='get'>
                    <input name="dish" placeholder='Dish' type="text" />
                    <select id="cuisine" name="cuisine" placeholder='Cuisine'>
                        <option></option>
                        {cousines.map(cousine => <option value={cousine}>{cousine}</option>)}
                    </select>
                    <select id="excludeCuisine" name="excludeCuisine" placeholder='Exclude Cuisine'>
                        <option></option>
                        {cousines.map(cousine => <option value={cousine}>{cousine}</option>)}
                    </select>
                    <select id="diet" name="diet" placeholder='Diet' >
                        <option></option>
                        {diets.map(cousine => <option value={cousine}>{cousine}</option>)}
                    </select>
                <button type="submit" value="Submit" className='search-button'>🔍</button>
            </form>
            <div className="searchBar">
            {newRecipes && newRecipes.map((recipe: RecipeCardItem, index) => 
                <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} key= {index} /> )}
        </div>
     </div>)
}

export default SearchForm;