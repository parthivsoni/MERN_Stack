import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const CreateBlog = () => {

    const navigate = useNavigate();
    const id = localStorage.getItem('userId');

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

//input change
const handleChange = (e) =>{
    setInputs(prevState => ({
        ...prevState,
        [e.target.name]:e.target.value
    }))
}

  //form handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const { data } = await axios.post('/api/v1/blog/create-blog',{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:id
            })

            if(data?.success){
                alert("blog created ")
                navigate('/my-blogs')
            }
    }catch(error){
        console.log(error)
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
        width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          marginTop="60px"
          
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={600}
            padding={3}
            color={"gray"}
          >
            Create a Post
          </Typography>
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:800}}>Title : </InputLabel>
          <TextField name="title" margin="normal" variant="outlined" value={inputs.title}  onChange={handleChange} required></TextField>
         
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:800}}>Description : </InputLabel>
          <TextField name="description" margin="normal" variant="outlined" value={inputs.description}  onChange={handleChange} required></TextField>
         
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:800}}>Image Url : </InputLabel>
          <TextField name="image" margin="normal" variant="outlined" value={inputs.image}  onChange={handleChange} required></TextField>
          <Button type="submit" color="primary" variant="contained">Submit</Button>
        </Box>

      </form>
    </>
  );
};

export default CreateBlog;
