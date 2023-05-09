import { arrayUnion } from 'firebase/firestore';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';
import './BlogsCard.css'

function BlogsCard (props : any) {
    const { title, id, description } = props;
    const{ user } = UserAuth();
    const navigate = useNavigate();

    const seeDetails = () => {
        try{
          navigate(`/blogs${id}`)  
        }catch{
            console.error();    
        }
    }

    return (
        <div className="recipe-card-item" onClick={seeDetails}>
            <h2 className="title"><b>{title}</b></h2>
            <div className='card-header'>
                <p className='read-more'>{description}</p>
            </div>
        </div>
    );
}

export default BlogsCard;