import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, getDoc, where, query, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { authenticator, dbConnection } from './FirebaseConfig';

const isUserUnique = async (username: string): Promise<boolean> => {
    const usersRef = collection(dbConnection, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size === 0;
}

export const login = async (email:string, password: string): Promise<any | undefined> => {
    try{
        const userCredentials = await signInWithEmailAndPassword(authenticator, email, password);
        const user = await getUserById(userCredentials.user.uid);
        return { username: user.username, uid: userCredentials.user.uid } as any;
    } catch(error) {
        return error
    }

}


export const register = async (username: string, email: string, password: string): Promise<string> => {
    if (! await isUserUnique(username)) {
    return "username already in use";
    }
    const userCredential = await createUserWithEmailAndPassword(authenticator, email, password);
    await addUser(username, userCredential.user.uid);
    return "created successfully";
}

export const addUser = async (userName: string, uid: string) => {
    await setDoc(doc(dbConnection, "users", uid), {
        username: userName,
        favRecipes: [],
        blogs: [],
    });
}

export const getUserById = async (uid: string) : Promise <any>=> {
    const docRef = doc(dbConnection, "users", uid);
    const docSnap = (await getDoc(docRef)).data();
    return docSnap;
}


