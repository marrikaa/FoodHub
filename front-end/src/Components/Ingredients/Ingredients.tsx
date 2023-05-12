import { useEffect, useState } from "react";
import { getIngredientsByID } from "../../Client/Client";
import { Idtype, IngredientsType } from "../../Types/Types";
import './Ingredients.css'


function Ingredients (props: Idtype)  {
    const { recipeId } = props;
    const [ingredients, setIngredients] = useState<IngredientsType[]>([]);

    useEffect(()=>{
        const getIngredients = async() => {
            const ingredients = await getIngredientsByID(recipeId);
            setIngredients(ingredients)
        }
        getIngredients()
    }, [recipeId])
   
    return(
        <div>
        {ingredients && ingredients.map((i: IngredientsType, index)=> (
            <div className="ingredients" key = {index}>
                <li> {i.name} - {i.amount.metric.value} {i.amount.metric.unit}</li>
        </div>   
        ))}
    </div> ) 
}
export default Ingredients
