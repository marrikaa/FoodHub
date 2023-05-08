import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { authenticator } from "../Firebase/FirebaseConfig";
import { addUser, getUserById } from "../Firebase/UserDB";


const AuthContext = createContext<any>({});


export const AuthContextProvider = ({children} :any) => {
    const [user, setUser] = useState ({})
    const [uid, setUid] = useState ("")
    const logOut = () => {
        signOut(authenticator);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(authenticator, (currentUser) => {
            setUser(currentUser!)
        })
        return () => {
            unsubscribe ();
        }
    },[])

    const googleSignIn = async () => { 
        const provider = new GoogleAuthProvider(); 
        const userCredential = await signInWithPopup(authenticator, provider); 
        setUid(userCredential.user.uid);
        const user = await getUserById(uid);
        if(!user) {
            await addUser(user!.displayName, uid)
        } else {
            setUser(user);
        }
       
    }

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}