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
            // setIngredients([{
            //     image: "string",
            //     name: "string",
            //     amount: {
            //         metric:{
            //             value:"string",
            //             unit:"string"},
            //         us:{value:"string",
            //         unit:"string"}
            //     }
            // }]);
        }
        getIngredients()
    }, [recipeId])
   
    return(
        <div>
        {ingredients && ingredients.map((i: IngredientsType, index)=> (
            <div className="ingredients" key = {index}><p>• {i.name} -  </p>
            <p>{i.amount.metric.value} {i.amount.metric.unit}</p>
        </div>   
        ))}
    </div> ) 
}
export default Ingredients
