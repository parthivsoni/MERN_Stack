import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'


const UserBlog = () => {

  const [blog , setBlogs] = useState([])

  //get blogs
  const getUserBlogs = async(req, res) => {
    try{
      const id  = localStorage.getItem('userId');
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if(data?.success){
        setBlogs(data?.userBlog.blogs)
      }
    }catch(error){
      console.log(error)
    }
  }
useEffect(()=>{
  getUserBlogs()
},[])

  return (
    <div>{blog && blog.length > 0 ? ( blog.map((blog) => (
      <BlogCard
      id={blog._id}
      isUser={true}
        title={blog.title}
        description={blog.description}
        image={blog.image}
        username={blog.user.username}
        time={blog.createdAt}
      />

    ))
    ) : (
      <h1> You haven't created any blog right now ... Create it buddy </h1>
    )}
    </div>
  )
}

export default UserBlog