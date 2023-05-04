import { useEffect, useState } from "react";
import { getIntructionByID } from "../../Client/Client";
import { Idtype, InstructionType } from "../../Types/Types";
import { useNavigate } from 'react-router-dom';

function Instruction (props: Idtype)  {
    const { recipeId } = props;
    const [instruction, setInstruction] = useState<InstructionType[]>([]);

    useEffect(()=>{
        const getInstruction = async() => {
            const ingredients = await getIntructionByID(recipeId);
            setInstruction(ingredients);
        }
        getInstruction()
    }, [])
   
    return(
        <div>
        {instruction && instruction.map((i: InstructionType)=> (
            <div className="intructions"><p>{i.number} -  </p>
            <p>{i.step}</p>
        </div>   
        ))}
    </div> ) 
}
export default Instruction