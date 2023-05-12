import { useEffect, useState } from "react";
import { UserAuth } from "../../../Context/AuthContext";
import { getAllBlogs } from "../../../Firebase/BlogsDB";
import { getUserById } from "../../../Firebase/UserDB";
import BlogsCard from "../BlogsCard/BlogsCard";
import './MyBlogs.css'

function AllBlogsPage (){
    const { user } = UserAuth();
    const [blogs, setBlogs] = useState<any[]>([]);
   
    useEffect(()=>{
        const setUserBlogs = async()=> {
            const blogs = await getAllBlogs()
            console.log(user);
            if(user && user.uid){
                const userData = await getUserById(user.uid)
                const filteredBlogs = blogs.filter((blog:any) => blog.owner !== userData.username)
                setBlogs(filteredBlogs);
            }else{
                setBlogs(blogs);
            }
        }
        setUserBlogs();
    },[user])

    return (
        <div>
            {blogs && blogs.map((blog :any, index) => (<BlogsCard image={blog.image} title={blog.title} id={blog.id} 
                description={blog.description} key={index} />))}
        </div>
    )
}
export default AllBlogsPage;