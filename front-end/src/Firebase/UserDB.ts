import { collection, setDoc, doc, getDoc, where, query, getDocs } from "firebase/firestore";
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


