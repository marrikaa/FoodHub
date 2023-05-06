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
            const instructions = await getIntructionByID(id!);
            // setInstruction([{
            //     number: 2,
            //     step: "jdsajsijadsid"
            // }]);
            setInstruction(instructions)
        }
        getInstruction()
    }, [])
   
    return(
        <div className="recipe-details">
        {getRecipeById &&
            <div className="details_img_title">
                <img className="details-photo" src={getRecipeById.image} />
                <div><p className="details-title"><b>{getRecipeById.title}</b></p>
                <p className="description">This mouth-watering recipe is ready in just 25 minutes and the ingredients detailed below can serve up to 4 people</p>
                </div> 
            </div>}
            <div className="title_steps_ing">
                <p>Ingredients</p>
                <p>Steps for cooking</p>
            </div>
        <div className="ingredients-steps">
            <div><Ingredients recipeId={id!} /></div>
            <div className="vl"></div>
            <div>
            {instruction && instruction.map((i: InstructionType, index) => (
                <div className="intructions" key={index}>
                    <li>{i.step}</li>
                </div>))}</div>
        </div>
        </div>

     ) 
}
export default Instruction