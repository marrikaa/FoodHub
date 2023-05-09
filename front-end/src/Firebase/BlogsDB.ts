import { collection, setDoc, doc, getDoc, where, query, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 } from "uuid";
import { dbConnection } from './FirebaseConfig';


export const createBlog = async (params: any): Promise<string> => {
    const currentId = v4();
    await setDoc(doc(dbConnection, "blogs", currentId), {
        title: params.title,
        description: params.description,
        id: currentId,
        owner: params.owner
    });
    return currentId;
}
export const getAllBlogs = async (): Promise<any> => {
    const projectsRef = collection(dbConnection, "blogs");
    const querySnapshot = await getDocs(query(projectsRef));
    const projects = querySnapshot.docs.map(project => project.data());
    return projects as any[];
}