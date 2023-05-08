import GoogleButton from "react-google-button";
import { UserAuth } from "../../Context/AuthContext";

function SignIn () {
    const { googleSignIn } = UserAuth();
    const handleGoogleSignIn = async () => {
        try{
            await googleSignIn();
        }catch(error){
            console.log(error);
        }
    }
 
    return (
        <div className="searchBar">
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    );
}

export default SignIn;