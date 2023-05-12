import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../Context/AuthContext";
import { getAllBlogsbyId } from "../../../Firebase/BlogsDB";
import { getUserById } from "../../../Firebase/UserDB";
import BlogsCard from "../BlogsCard/BlogsCard";
import './MyBlogs.css'

function MyBlogs (){
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<any[]>();

    //const [blogIscreated, setBlogIsCreated]= useState<boolean>(false)

    const createBlogHandler = async() => {
        try{
            navigate(`/createBlog`)  
          }catch{
              console.error();    
          }
    }

    useEffect(()=>{
        const setUserBlogs = async()=> {
            if(user && user.uid){
                const userdata = await getUserById(user.uid)
                const blogs= await getAllBlogsbyId(userdata.blogs)
                setBlogs(blogs);
            }
        }
        setUserBlogs();
    },[user])

    return (
        <div>
            <h4 onClick={createBlogHandler} className='create-blog-button'> Create new Blog</h4>
            {blogs && blogs.map((blog :any, index) => (<BlogsCard image={blog.image} title={blog.title} id={blog.id} 
                description={blog.description} key={index} />))}
        </div>
    )
}
export default MyBlogs;


