import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { UserAuth } from "../../Context/AuthContext";

import './RegistrationForm.css'

type PropsType ={
    setPopUp : ( ispopup:boolean ) => void;
    setPopUpForSign : ( ispopup:boolean ) => void;
}

const RegistrationForm = (props : PropsType) => {
    const { register} = UserAuth();
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
            setUser({
                username: username.value
            })
            navigate('/');
            closePopUpHandler();
        }
    }
    const closePopUpHandler = () => {
        setPopUp(false); 
        setPopUpForSign(false)
    }

    return (
        <div className='PopUp'>
            <button className="popup-x" onClick={closePopUpHandler}>X</button>
            <form onSubmit={formSubmitted} className='login-form'>
                <h2>Create account</h2>
                <input className='form-input' name='email' placeholder='Your Email' type="email" />
                <input className='form-input' name='username' placeholder='Your username' type="text" />
                <input className='form-input' name='password' placeholder='Your password' type="password" />
                <input className='form-input' name='password_2' placeholder='Confirm password' type="password" />
                <h3>{wrongInput}</h3>
                <button className='form-button' type='submit'>Register</button>
                {wrongInput !== "" && <label>{wrongInput}</label>}
            </form>
        </ div>
    )
}

export default RegistrationForm;