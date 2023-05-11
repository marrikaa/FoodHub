import { collection, setDoc, doc, getDoc, where, query, getDocs} from "firebase/firestore";
import { dbConnection } from './FirebaseConfig';

export const isUserUnique = async (username: string): Promise<boolean> => {
    const usersRef = collection(dbConnection, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size === 0;
}

export const addUser = async (userName: string, uid: string) => {
    await setDoc(doc(dbConnection, "users", uid), {
        username: userName,
        favRecipes: [],
        blogs: [],
    });
}

export const getUserById = async (uid: string) : Promise <any>=> {
    try{
        const docRef = doc(dbConnection, "users", uid);
        const docSnap = (await getDoc(docRef)).data();
        return docSnap as any;
    }catch{
        console.error();   
    }
}

export const UpdateUserFavRecipes = async (uid: string, user: any) => {
    const userRef = doc(dbConnection, "users", uid);
    setDoc(userRef, user, { merge: true });
    return "success";
}

export const updateUserBlog = async (uid: string, user: any) => {
    const userRef = doc(dbConnection, "users", uid);
    setDoc(userRef, user, { merge: true });
    return "success";
}



