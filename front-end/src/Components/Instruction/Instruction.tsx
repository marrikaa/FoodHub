import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIntructionByID } from "../../Client/Client";
import { AppContext } from "../../Context/AppContext";
import { Idtype, InstructionType, RecipeCardItem } from "../../Types/Types";
import Ingredients from "../Ingredients/Ingredients";
import './Instruction.css'

function Instruction ()  {
    const [instruction, setInstruction] = useState<InstructionType[]>([]);
    const { id } = useParams();
    const {recipes} = useContext(AppContext);
    const getRecipeById: RecipeCardItem = recipes.filter((recipe: RecipeCardItem) => recipe.id == id)[0];

    useEffect(() => {
        const getInstruction = async() => {
            const ingredients = await getIntructionByID(id!);
            setInstruction(ingredients);
        }
        getInstruction()
    }, [])
   
    return(
        <>
        {getRecipeById && <><img src={getRecipeById.image} />
        <p>{getRecipeById.title}</p></>}
        <div><Ingredients recipeId={id!} /></div>
        {instruction && instruction.map((i: InstructionType)=> (
            <div className="intructions">
                <p>{i.number} -  </p>
                <p>{i.step}</p>
            </div>))}
    </> ) 
}
export default Instruction