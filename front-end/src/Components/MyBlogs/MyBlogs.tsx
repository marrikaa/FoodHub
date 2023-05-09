import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import { getUserById } from "../../Firebase/UserDB";
import BlogsCard from "../BlogsCard/BlogsCard";
import './MyBlogs.css'

function MyBlogs (){
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<any[]>([]);
    const createBlogHandler = async() => {
        try{
            navigate(`/createBlog`)  
          }catch{
              console.error();    
          }
    }
    useEffect(()=>{
        const setUserBlogs = async()=> {
            const userdata = await getUserById(user.uid)
            setBlogs(userdata.blogs)
        }
        setUserBlogs();
    },[user])
    return (
        <div>
            <h4 onClick={createBlogHandler} className='add-blog-button'> Create new Blog</h4>
            {blogs && blogs.map((blog :any) => (<BlogsCard title={blog.title} id={blog.id} 
                description={blog.description} />))}
        </div>
    )
}
export default MyBlogs;


