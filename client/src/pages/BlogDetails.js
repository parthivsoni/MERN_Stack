import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });

  //get details
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
            title:data?.blog.title,
            description:data?.blog.description,
            image:data?.blog.image,
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });

      if (data?.success) {
        alert("blog Updated ");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blog);
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
            Update Post
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 800 }}>
            Title :{" "}
          </InputLabel>
          <TextField
            name="title"
            margin="normal"
            variant="outlined"
            value={inputs.title}
            onChange={handleChange}
            required
          ></TextField>

          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 800 }}>
            Description :{" "}
          </InputLabel>
          <TextField
            name="description"
            margin="normal"
            variant="outlined"
            value={inputs.description}
            onChange={handleChange}
            required
          ></TextField>

          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: 800 }}>
            Image Url :{" "}
          </InputLabel>
          <TextField
            name="image"
            margin="normal"
            variant="outlined"
            value={inputs.image}
            onChange={handleChange}
            required
          ></TextField>
          <Button type="submit" color="warning" variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
