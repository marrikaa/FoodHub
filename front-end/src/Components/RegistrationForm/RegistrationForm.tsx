import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import {  register } from "../../Firebase/UserDB";
import './RegistrationForm.css'

type PropsType ={
    setPopUp : ( ispopup:boolean ) => void;
    setPopUpForSign : ( ispopup:boolean ) => void;
}

const RegistrationForm = (props : PropsType) => {
    const { setPopUp, setPopUpForSign } = props 

    const { setUser } = useContext(AppContext);

    const [wrongInput, setWrongInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setWrongInput("");
        }, 2000);
    }, [wrongInput]);

    const formSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, username, password, password_2 } = event.currentTarget;
        if (password.value !== password_2.value) {
            setWrongInput("Passwords are not the same!");
            return;
        }
        let res = await register(username.value, email.value,  password.value);
        if (res!== 'created successfully') {
            setWrongInput(res);
        } else {
            closePopUpHandler();
            setUser({
                username: username.value
            })
            navigate('/');
        }
    }
    const closePopUpHandler = () => {
        setPopUp(false); 
        setPopUpForSign(false)
    }

    return (
        <div className='PopUp'>
            <button className="popup-x" onClick={closePopUpHandler}>X</button>
            <form onSubmit={formSubmitted} className='formInput'>
                <h2>Create account</h2>
                <input name='email' placeholder='Your Email' type="email" />
                <input name='username' placeholder='Your username' type="text" />
                <input name='password' placeholder='Your password' type="password" />
                <input name='password_2' placeholder='Confirm password' type="password" />
                <h3>{wrongInput}</h3>
                <button className='register-button' type='submit'>Register</button>
                {wrongInput !== "" && <label>{wrongInput}</label>}
            </form>
        </ div>
    )
}

export default RegistrationForm;