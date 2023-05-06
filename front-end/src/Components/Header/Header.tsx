import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
    const navigate = useNavigate();
    const redirectToSearch = () => {
        try{
          navigate(`/searchDish`)  
        }catch{
            console.error();    
        }
    }
 
    return (
        <div className="page-header">
            <div className='navbar'>
                <h3 onClick={redirectToSearch} className='navbar-element'>Recipes</h3>
                <h3 className='navbar-element'>Blogs</h3>
                <h3 className='navbar-element'>Sign in</h3>
            </div>
            
            <h3 className='text-header'>
                Welcome to FoodHub, your go-to destination for all things food!<br />
                Whether you're a seasoned chef or just starting out in the kitchen, <br />
                our website is here to inspire and guide you on your culinary journey.<br />
                From mouth-watering recipes to expert cooking tips, <br />
                we've got everything you need to take your love of food to the next level. <br />
                So why not pull up a seat at our table and join the FoodHub community? <br />
                We can't wait to share our passion for food with you!<br />
            </h3>
        </div>
    );
}

export default Header;