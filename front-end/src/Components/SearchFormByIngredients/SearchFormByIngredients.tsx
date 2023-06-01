import { useContext, useEffect, useState } from 'react';
import {  getrecipesByIngredient } from '../../Client/Client';
import { AppContext } from '../../Context/AppContext';
import { UserIngredients } from '../../Types/Types';
import { RecipeCardItem } from '../../Types/Types';
import RecipesCard from '../RecipesCard/RecipesCard';
import './SearchFormByIngredients.css'

function SearchFormByIngredients () {
    const { recipes, setRecipes} = useContext(AppContext);
    const[ currentIngredients, setCurrentIngredients]=useState<string[]>([]);
    const [userIngredients, setUserIngredients] = useState<UserIngredients> ({  
        ingredients: "",
        number: '1',
        ignorePantry: 'true',
        ranking: '1'
    });
    const [newRecipes, setNewRecipes] = useState<RecipeCardItem[]>([]);
    
    // const getIngredients= async() =>{
    //     if(userIngredients.ingredients !== ""){
    //         const recipe = await getrecipesByIngredient(userIngredients);
    //         setNewRecipes(recipe);
    //         setRecipes(recipe);
    //     }else{
    //         setNewRecipes(recipes)
    //     }    
    // }
    useEffect(()=>{
        const getIngredients= async() =>{
            if(userIngredients.ingredients !== ""){
                const recipe = await getrecipesByIngredient(userIngredients);
                setNewRecipes(recipe);
                setRecipes(recipe);
            }else{
                setNewRecipes(recipes)
            }    
        }
        getIngredients();
    },[userIngredients]);

    const formSubmitted = () => {
        setUserIngredients({
            ...userIngredients,
            ingredients: currentIngredients.join(', '),
        });
        setCurrentIngredients([]);
    }

    const changeCurrentIngredient = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {ingredient} = event.currentTarget;
        setCurrentIngredients([...currentIngredients, ingredient.value])
        ingredient.value = "";
    }

    const removeIngredient = (index: number) => {
        const tmpSteps = [...currentIngredients];
        tmpSteps.splice(index, 1);
        setCurrentIngredients(tmpSteps);
    }

    return (
        <>
            <div className='ingerdients-form'>
                <form onSubmit={changeCurrentIngredient}>
                    <input type='text' name="ingredient" placeholder='Add ingredients' className='recipe-ingredients' required />
                </form>
                {currentIngredients && currentIngredients.map((ingredient, index) => 
                <div className='ingredients-container'>
                    <p className='each-ingredient'>• {ingredient}</p>
                    <button key={index} onClick={() => removeIngredient(index)} className="step-remove-button">x</button>
                </div>)}
                <button type="submit" value="Submit" className='search-recipe-button' onClick={formSubmitted}>🔍</button>
            </div>
            <div className="searchBar">
            {newRecipes && newRecipes.map((recipe: RecipeCardItem, index) => 
                <RecipesCard recipe={recipe} key= {index} /> )}
            </div>
    </>
    )
}

export default SearchFormByIngredients;