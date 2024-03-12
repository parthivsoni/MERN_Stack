import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`)
  }

  const handleDelete = async() => {
    try{
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
      if(data?.success){
        toast.success("blog deletd");
        window.location.reload();
      }
    }catch(error){
      console.log(error)
    }
  }
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}} color="info">
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          <b>Title : {title}</b>
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <u> Description </u> : {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
