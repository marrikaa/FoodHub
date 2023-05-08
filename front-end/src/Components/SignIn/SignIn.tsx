import { useState } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import { login } from "../../Firebase/UserDB";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import './SignIn.css'

type PropsType = {
    setPopUpForSign : ( ispopup:boolean ) => void;
}

function SignIn (props :PropsType) {
    const {  setPopUpForSign } = props 
    const [popUpForReg, setPopUpForReg] = useState<boolean>(false)
    const { googleSignIn } = UserAuth();
    const [error, setError] = useState<string>();
    const [user, setUser] = useState<any>();
    const navigate = useNavigate();
    
    const handleGoogleSignIn = async () => {
        try{
            setPopUpForSign(false)
            await googleSignIn(); 
        }catch(error){
            console.log(error);
        }
    }
    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { userNameInput, passwordInput } = event.currentTarget;
        let currentUser = await login(userNameInput.value, passwordInput.value);
        if (currentUser!.username) {
            setPopUpForSign(false)
            setUser(currentUser);
            navigate(-1);
        }
        else {
            setError("userName or password is incorrect");
        }
    }

    return (
        <div className="PopUp">
            <button className="popup-x" onClick={()=> setPopUpForSign(false)} >X</button>
            <form onSubmit={formSubmitted} className='formInput' method='get'>
                <h2>Log in</h2>
                <input name="userNameInput" placeholder='Enter Email' type="email" />
                <input name="passwordInput" placeholder='Enter password' type="password" />
                <button className='red-button' type='submit' onClick={()=> setPopUpForSign(false)}>log in</button>
            </form>
            {error && <label style={{ marginTop: '1em' }}>{error}</label>}
            <h2 className="line"><span>or</span></h2>
            <h3 className='create-account-element' data-toggle="modal" onClick={() =>{setPopUpForReg(true)}}>Sigh in with Email</h3>
            {popUpForReg && <RegistrationForm setPopUp={setPopUpForReg} setPopUpForSign = {setPopUpForSign} />}
            <GoogleButton onClick={handleGoogleSignIn} /> 
        </div>
    );
}

export default SignIn;