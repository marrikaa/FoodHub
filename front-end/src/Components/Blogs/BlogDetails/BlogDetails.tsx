import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../../Firebase/BlogsDB";
import { BlogType } from "../../../Types/Types";


function BlogDetails ()  {
    const [blog, setBlog] = useState<BlogType>();
    const { id } = useParams();

    useEffect(() => {
        const getBlog = async() => {
            alert("hey");
            const currentBlog = await getBlogById(id!);
            setBlog(currentBlog)  
        }
        getBlog()
    }, [id])
   
    return(<>
        {blog && <div className="recipe-details">
          <div className="details_img_title">
                <img className="details-photo" alt="" src={blog.image} />
                <div><p className="details-title"><b>{blog.title}</b></p>
                <p className="description">{blog.description}</p>
                </div> 
            </div>
            <div className="title_steps_ing">
                <p>Ingredients</p>
                <p>Steps for cooking</p>
            </div>
        <div className="ingredients-steps">
            {blog.ingredients.map((ingredient:string) => <li>{ingredient}</li> )}
            <div className="vl"></div>
            <div className="intructions">{blog.instruction}</div>
        </div>
        </div>}</>

     ) 
}
export default BlogDetails