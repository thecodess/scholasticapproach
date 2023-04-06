import  React, {useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import scholasticImg from "../assests/images/scholasticwhiteimg.png";
import Header from "../components/Header/Header";
import "./Continue.css"
axios.defaults.withCredentials = true

export default function Continue(props) {
    const [lloading, setlloading]= useState(true);
  const [login, setlogin]= useState(false);

  useEffect(() => {
    fetchlogin();
    },[login]);

    const fetchlogin=()=>{
      setlloading(true)
      const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
      axios.post("/status",config)
            .then(response=>{
              setlogin(response.data.status)
              setlloading(false)
            },
            error => {
              setTimeout(() => {
                fetchlogin()
              }, 5000);
              
            })
           
    }

  return (
      <>
      <Header />
      <div className='continue-container'>
      <div className='continue-container-content'>
        {lloading?(<CircularProgress color="secondary" />):(
        <>
            {login?(<Navigate to="/home" replace />):(<>
            <div className='logo-bg' style={{backgroundImage:`url(${scholasticImg})`}}></div>
            <div className='continue-content'>
            <Container component="main"sx={{mt:"auto",mb:"auto"}}>
            <Typography component="h1" variant="h5" gutterBottom>
            Want to take our Online Mock Examination
          </Typography>
            <Typography variant="h6" gutterBottom>
            Join Scholastic Approach today
          </Typography>
          <Link to={"/sign-up?redirect="+props.redirect}>
          <Button variant="contained" sx={{borderRadius:"24px",mb:1,mt:2}} size="large" fullWidth>
          Sign Up
        </Button></Link>
        <Link to={"/sign-in?redirect="+props.redirect}>
        <Button variant="outlined" sx={{borderRadius:"24px",mt:1}} size="large" fullWidth>
          Sign In
        </Button></Link>
            </Container>
            </div>
            <div></div>
            </>)}</>
        )}
        </div>
        <AppBar position="static" sx={{ top: 'auto', bottom: 0,backgroundColor:"#e2e4f8a8" }}>
        <Typography variant="body2" sx={{color:"#444",mt:2,mb:2}} align="center">
      {'Copyright © '}
      <Link color="inherit" to="/home">
        Scholastic Approach
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
      </AppBar>
        </div>
      </>
  );
}