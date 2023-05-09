import { useContext, useEffect, useState } from 'react';
import {  getrecipesByIngredient } from '../../Client/Client';
import { AppContext } from '../../Context/AppContext';
import { UserIngredients } from '../../Types/Types';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchFormByIngredients.css'

function SearchFormByIngredients () {
    const { recipes, setRecipes} = useContext(AppContext);
    const [userIngredients, setUserIngredients] = useState<UserIngredients> ({  
        ingredients: "",
        number: '1',
        ignorePantry: 'true',
        ranking: '1'
    });
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);
    
    useEffect(() => {
        const getIngredients= async() =>{
            const recipe = await getrecipesByIngredient(userIngredients);
            if(userIngredients.ingredients!== ""){
                setNewRecipes(recipe);
                setRecipes(recipe);
            }else{
                setNewRecipes(recipes)
            }       
        }
        getIngredients()
      }, [userIngredients]);

    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { ingredients } = event.currentTarget;
        setUserIngredients({
            ...userIngredients,
            ingredients: await ingredients.value.split(" ").join(','),
            });
        
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