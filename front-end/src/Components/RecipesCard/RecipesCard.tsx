import { useNavigate } from 'react-router-dom';
import { buffer } from 'stream/consumers';
import { RecipeCardItem } from '../../Types/Types';
import Ingredients from '../Ingredients/Ingredients';
import './RecipesCard.css'

function RecipesCard (props : RecipeCardItem) {
    const { title, image, id } = props;
    const navigate = useNavigate();
    
    const seeInstructions = () => {
        try{
          navigate(`/${id}`)  
        }catch{
            console.error();    
        }
    }
    return (
        <div className="recipe-card-item" onClick={seeInstructions}>
            <img className= "card-image" src={image} />
            <h2 className="title"><b>{title}</b></h2>
            <p className='description'>
                <Ingredients recipeId={id} />
            </p>
            <p className='read-more'>Instruction</p>
        </div>
    );
}

export default RecipesCard;