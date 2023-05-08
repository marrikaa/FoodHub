import { useContext, useEffect, useState } from 'react';
import { getRecipes, getrecipesByIngredient } from '../../Client/Client';
import { AppContext } from '../../Context/AppContext';
import { RecipeType, UserIngredients } from '../../Types/Types';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchFormByIngredients.css'

function SearchFormByIngredients () {
    const { setRecipes} = useContext(AppContext);
    const [userIngredients, setUserIngredients] = useState<UserIngredients> ({  
        ingredients: "",
        number: '1',
        ignorePantry: 'true',
        ranking: '1'
    });
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);
    

    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { ingredients } = event.currentTarget;
        const getrecipes = async () => {
            setUserIngredients({
                ...userIngredients,
                ingredients: await ingredients.value.split(" ").join(','),
             });
            const recipes = await getrecipesByIngredient(userIngredients);
            setNewRecipes(recipes);
            setRecipes(recipes);
        }
        getrecipes();
    }
 
    return (
        <div className='searchForm'>
            <form onSubmit={formSubmitted} className='formInput' method='get'>
                    <input name="ingredients" placeholder='Ingredients' type="text" />
                <button type="submit" value="Submit" className='search-button'>🔍</button>
            </form>
            <div className="searchBar">
            {newRecipes && newRecipes.map((recipe: RecipeCardItem, index) => 
                <RecipesCard title={recipe.title} image = {recipe.image} id={recipe.id} key= {index} /> )}
        </div>
     </div>)
}

export default SearchFormByIngredients;