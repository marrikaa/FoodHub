import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import { getAllBlogs } from "../../Firebase/BlogsDB";
import { getUserById } from "../../Firebase/UserDB";
import BlogsCard from "./BlogsCard";
import './MyBlogs.css'

function AllBlogsPage (){
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<any[]>([]);
   
    useEffect(()=>{
        const setUserBlogs = async()=> {
            const blogs = await getAllBlogs()
            const userData = await getUserById(user.uid)
            const filteredBlogs = blogs.filter((blog:any) => blog.owner !== userData.username)
            setBlogs(filteredBlogs)
        }
        setUserBlogs();
    },[])

    return (
        <div>
            {blogs && blogs.map((blog :any) => (<BlogsCard title={blog.title} id={blog.id} 
                description={blog.description} />))}
        </div>
    )
}
export default AllBlogsPage;