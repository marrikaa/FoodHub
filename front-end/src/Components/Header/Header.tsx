import { useNavigate } from 'react-router-dom';
import './Header.css'
import { UserAuth } from '../../Context/AuthContext';
import { useState } from 'react';
import SignIn from '../SignIn/SignIn';

function Header() {
    const [popUpForSign, setPopUpForSign] = useState<boolean>(false)
    const [logOutCheckerMessage, setLogOutCheckerMessage] = useState<string>("")
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

    const logOutHandler = async() => {
        try{
            await logOut();
            setLogOutCheckerMessage("")
            navigate(`/`)
        }catch(error){
            console.log(error)
        }
    }

    const logOutChecker = () => {
        setLogOutCheckerMessage("Do you want to log out?")
    }

    const redirectToMyBlogs = async() => {
        try{
            navigate(`/myblogs`)  
          }catch{
              console.error();    
          }
    }
    const redirectToMyRecipes = async() => {
        try{
            navigate(`/myRecipes`)  
          }catch{
              console.error();    
          }
    }
    const redirectToAllBlogsPage = async() => {
        try{
            navigate(`/blogs`)  
          }catch{
              console.error();    
          }
    }
    
 
    return (
        <div className="page-header">
            <div className='navbar'>
            <h3  className='navbar-element' onClick={redirectToAllBlogsPage}>Blogs</h3>
                <div className='dropdown'>
                    <h3 className='navbar-element dropbtn'>Recipes</h3>
                    <div className = "dropdown-content">
                        <h4 onClick={redirectToSearch} className='navbar-inner-element dropbtn'>Search Recipes</h4>
                        <h4 onClick={redirectToSearchByIngerdients} className='navbar-inner-element dropbtn'>Search By Ingerients</h4>
                    </div>
                </div>
                {user?
                    <div  className='dropdown'>
                        <img className='navbar-img dropbtn navbar-element' alt="" src={user.photoURL? user.photoURL
                            :"https://www.pngkit.com/png/detail/973-9737735_food-product-font-graphics-png-clipart-free-download.png" } />
                        <div className = "dropdown-content">
                            <h4 onClick={redirectToMyBlogs} className='navbar-inner-element dropbtn'>My blogs</h4>
                            <h4 onClick={redirectToMyRecipes} className='navbar-inner-element dropbtn'>My recipes</h4>
                            <h4 onClick={logOutChecker} className='navbar-inner-element dropbtn'>Log out</h4>
                        </div> 
                        {logOutCheckerMessage && 
                            <div className='ingredients-PopUp'>
                                <p>{logOutCheckerMessage}</p>
                                    <div className='pop-up-button-container'>
                                        <button  onClick={logOutHandler}>Yes</button>
                                        <button onClick={()=>setLogOutCheckerMessage("")}>No</button>
                            </div></div>}
                    </div>
                    : <div>
                        <h3 className='navbar-element' data-toggle="modal" onClick={() => setPopUpForSign(true)}>Sign in</h3>
                        {popUpForSign && <SignIn setPopUpForSign={setPopUpForSign}/>}
                        </div>}
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