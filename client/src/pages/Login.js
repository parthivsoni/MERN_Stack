import React, { useState } from "react";
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from 'react-hot-toast';
import { authActions } from "../redux/store";

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //state
  const [input, setInputs] = useState({
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
    const { data } = await axios.post('/api/v1/user/login',{
      email:input.email,
      password:input.password
    });

    console.log("Response data is :" ,data)

    if(data.success){
      localStorage.setItem("userId", data?.user?._id);
      dispatch(authActions.login());
      toast.success("User login Successfully");
      navigate('/');
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
    textAlign={"center"}>Login</Typography>

  <TextField placeholder="email"
    value={input.email}
    name="email"
    margin="normal"
    onChange={handleChange}
    type={"email"}
    required
  />

  <TextField placeholder="password"
    value={input.password}
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
    onClick={() => { navigate("/register") }}
  >Not a User? Register</Button>
</Box>
</form>
    </>
  )
}

export default Login