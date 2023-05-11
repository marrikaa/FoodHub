import { useNavigate } from 'react-router-dom';
import './BlogsCard.css'

function BlogsCard (props : any) {
    const { title, id, description, image } = props;
    const navigate = useNavigate();

    const navigateToBlogDetails = () => {
        try{
          navigate(`/blogs/${id}`)  
        }catch{
            console.error();    
        }
    }

    return (
        <div className="blogs-card-item" onClick={navigateToBlogDetails}>
            <img className="blog-image" src={image} />
            <div>
                <h2 className="blog-title"><b>{title}</b></h2>
                <p className="blog-description"><b>{description}</b></p>
            </div>
        </div>
    );
}

export default BlogsCard;