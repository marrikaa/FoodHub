import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { authenticator } from "../Firebase/FirebaseConfig";
import { addUser, getUserById, isUserUnique } from "../Firebase/UserDB";



const AuthContext = createContext<any>({});

export const AuthContextProvider = ({children} :any) => {
    const [user, setUser] = useState ({});
    const logOut = () => {
        signOut(authenticator);
    } 
    const unsubscribe = onAuthStateChanged(authenticator, (currentUser) => {
        setUser(currentUser!)
    })

    useEffect(()=>{
        return () => {
            unsubscribe ();
        }
    },[])

    const googleSignIn = async () => { 
        const provider = new GoogleAuthProvider(); 
        const userCredential = await signInWithPopup(authenticator, provider); 
        const user : any = await getUserById(userCredential.user.uid);
        if(!user) {
            onAuthStateChanged(authenticator, async (currentUser) => {
                await addUser(currentUser?.displayName!, userCredential.user.uid)
                setUser(currentUser!)
            })
        } else {
            unsubscribe();
        }
    }

    const emailSignIn =async (email:string, password: string): Promise<any | undefined> => {
            try{
                const userCredentials = await signInWithEmailAndPassword(authenticator, email, password);
                const user = await getUserById(userCredentials.user.uid);
                unsubscribe();
                return { username: user.username, uid: userCredentials.user.uid } as any;
            } catch(error) {
                return "userName or password is incorrect"
            }
        }

    const register = async (username: string, email: string, password: string): Promise<string> => {
        if (! await isUserUnique(username)) {
            return "username already in use";
        }
        try{const userCredential = await createUserWithEmailAndPassword(authenticator, email, password);
            await addUser(username, userCredential.user.uid);
            unsubscribe();
            return "created successfully";
        }catch (error){
            return "Email already is in use"
        }
    }

    return (
        <AuthContext.Provider value={{googleSignIn, emailSignIn, register, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}