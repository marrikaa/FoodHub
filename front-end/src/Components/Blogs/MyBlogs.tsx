import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import { getAllBlogsbyId } from "../../Firebase/BlogsDB";
import { getUserById } from "../../Firebase/UserDB";
import BlogsCard from "./BlogsCard";
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
            console.log(user)
            console.log("myblogs")
            if(user && user.uid){
                const userdata = await getUserById(user.uid)
                const blogs= await getAllBlogsbyId(userdata.blogs)
                setBlogs(blogs);
                console.log(blogs);
            }
        }
        setUserBlogs();
    },[user])
    return (
        <div>
            <h4 onClick={createBlogHandler} className='add-blog-button'> Create new Blog</h4>
            {blogs && blogs.map((blog :any, index) => (<BlogsCard title={blog.title} id={blog.id} 
                description={blog.description} key={index} />))}
        </div>
    )
}
export default MyBlogs;


