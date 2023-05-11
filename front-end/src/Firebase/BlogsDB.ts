import { collection, setDoc, doc, getDoc, query, getDocs} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { dbConnection, dbStorage } from './FirebaseConfig';


export const createBlog = async (params: any): Promise<string> => {
    const currentId = v4();
    await setDoc(doc(dbConnection, "blogs", currentId), {
        title: params.title,
        instruction: params.instruction,
        ingredients: params.ingredients,
        description: params.description,
        id: currentId,
        owner: params.owner,
        image: params.image,
    });
    console.log(currentId);
    return currentId;
}
export const getAllBlogs = async (): Promise<any> => {
    const blogsRef = collection(dbConnection, "blogs");
    const querySnapshot = await getDocs(query(blogsRef));
    const blogs = querySnapshot.docs.map(blog => blog.data());
    return blogs as any[];
}

export const getBlogById = async (uid: string): Promise<any> => {
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

const saveBlogsImage = async (uid: string, image: any): Promise<any> => {
    try{
        const imageUID = `images/${uid}`
        const imageRef = ref(dbStorage, imageUID);
        await uploadBytes(imageRef, image)
    } catch {
        console.error();
    }
}

export const saveBlogsImageAndGetUrl = async (path: string, image: any): Promise<any> => {
    try{
        await saveBlogsImage(path, image);
        const imagelistref =  ref(dbStorage, 'images/');
        const listOfRefs = await listAll(imagelistref)
        for (const item of listOfRefs.items) {
            if(item.fullPath!.split("/")[1] === path){
                console.log("here")
                return await getDownloadURL(item)
            }
    }} catch {
        console.error();
    }
}