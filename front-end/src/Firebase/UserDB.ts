import { collection, setDoc, doc, getDoc, where, query, getDocs, updateDoc, arrayUnion, addDoc } from "firebase/firestore";
import { authenticator, dbConnection } from './FirebaseConfig';

const isUserUnique = async (username: string): Promise<boolean> => {
    const usersRef = collection(dbConnection, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size === 0;
}

export const addUser = async (userName: string, uid: string) => {
    await addDoc(collection(dbConnection, "users", uid), {
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


