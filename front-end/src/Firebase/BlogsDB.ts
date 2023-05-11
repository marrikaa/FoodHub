import { collection, setDoc, doc, getDoc, query, getDocs} from "firebase/firestore";
import { v4 } from "uuid";
import { dbConnection } from './FirebaseConfig';


export const createBlog = async (params: any): Promise<string> => {
    const currentId = v4();
    await setDoc(doc(dbConnection, "blogs", currentId), {
        title: params.title,
        instruction: params.instruction,
        ingredients: params.ingredients,
        description: params.description,
        id: currentId,
        owner: params.owner
    });
    return currentId;
}
export const getAllBlogs = async (): Promise<any> => {
    const blogsRef = collection(dbConnection, "blogs");
    const querySnapshot = await getDocs(query(blogsRef));
    const blogs = querySnapshot.docs.map(blog => blog.data());
    return blogs as any[];
}

const getBlogById = async (uid: string): Promise<any> => {
    const docRef = doc(dbConnection, "blogs", uid);
    const docSnap = (await getDoc(docRef)).data();
    return docSnap;
}

export const getAllBlogsbyId = async (uids: string[]): Promise<any> => {
    const getAllBlogs = async () => {
        const blogsArray: any[] = [];
        for (const uid of uids) {
            blogsArray.push(await getBlogById(uid));
        }
        return blogsArray;
    }
    return (await getAllBlogs());
}