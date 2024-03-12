import React, { useState } from "react";
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';


const Register = () => {

  const navigate = useNavigate()

  //state
  const [input, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  //handle func.
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
    const { data } = await axios.post('/api/v1/user/register',{
      username:input.username,
      email:input.email,
      password:input.password
    });
    console.log(data)
    if(data.success){
      toast.success("User register successfully...!")
      navigate('/login');
    }
    }catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <Box maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}>
          <Typography variant="h4"
            sx={{ textTransform: 'uppercase' }}
            padding={3}
            textAlign={"center"}>Register</Typography>

          <TextField
            placeholder="username"
            name="username"
            type="text"
            value={input.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField placeholder="email"
            value={input.name}
            onChange={handleChange}
            name="email"
            margin="normal"
            type="email"
            required
          />

          <TextField placeholder="password"
            value={input.name}
            onChange={handleChange}
            name="password"
            margin="normal"
            type="password"
            required />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >Submit</Button>
          <Button
            type="submit"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => { navigate("/login") }}
          >Already Register ? Login</Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
