import { useNavigate } from 'react-router-dom';
import './Header.css'
import { UserAuth } from '../../Context/AuthContext';

function Header() {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const redirectToSearch = () => {
        try{
          navigate(`/searchDish`)  
        }catch{
            console.error();    
        }
    }

    const redirectToSearchByIngerdients = () => {
        try{
          navigate(`/searchDishByIngredients`)  
        }catch{
            console.error();    
        }
    }

    const redirectToSIgnIn= () => {
        try{
          navigate(`/signIn`)  
        }catch{
            console.error();    
        }
    }
    const logOutHandler = async() => {
        try{
            console.log(user)
            await logOut();

        }catch(error){
            console.log(error)
        }
    }

    const redirectToMyBlogs = async() => {
        try{
            navigate(`/myblogs`)  
          }catch{
              console.error();    
          }
    }
 
    return (
        <div className="page-header">
            <div className='navbar'>
                <div className='dropdown'>
                    <h3 className='navbar-element dropbtn'>Recipes</h3>
                    <div className = "dropdown-content">
                        <h4 onClick={redirectToSearch} className='navbar-inner-element dropbtn'>Search Recipes</h4>
                        <h4 onClick={redirectToSearchByIngerdients} className='navbar-inner-element dropbtn'>Search By Ingerients</h4>
                    </div>
                </div>
                <h3  className='navbar-element'>Blogs</h3>
                {user?.displayName?  
                    <div  className='dropdown'>
                        <img className='navbar-img dropbtn navbar-element' src ={user.photoURL} />
                        <div className = "dropdown-content">
                            <h4 onClick={redirectToMyBlogs} className='navbar-inner-element dropbtn'>My blogs</h4>
                            <h4 onClick={logOutHandler} className='navbar-inner-element dropbtn'>My recipes</h4>
                            <h4 onClick={logOutHandler} className='navbar-inner-element dropbtn'>Log out</h4>
                        </div> 
                    </div>
                    : <h3 onClick={redirectToSIgnIn} className='navbar-element'>Sign in</h3>}
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