import { collection, setDoc, doc, getDoc, where, query, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { RecipeCardItem } from "../Types/Types";
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
    const docRef = doc(dbConnection, "users", uid);
    const docSnap = (await getDoc(docRef)).data();
    return docSnap;
}

export const UpdateUserFavRecipes = async (uid: string, user: any) => {
    const userRef = doc(dbConnection, "users", uid);
    setDoc(userRef, user, { merge: true });
    return "success";
}

export const UpdateUserBlog = async (uid: string, user: any) => {
    const userRef = doc(dbConnection, "users", uid);
    setDoc(userRef, user, { merge: true });
    return "success";
}



