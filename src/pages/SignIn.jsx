import  React, {useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { blue, green } from '@mui/material/colors';
import validator from 'validator';
import CircularProgress from '@mui/material/CircularProgress';
import Header from "../components/Header/Header";
axios.defaults.withCredentials = true

export default function SignIn() {
    const [emailerror,setemailerror]=useState(false)
    const [passworderror,setpassworderror]=useState(false)
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
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
              setlloading(false)
              setlogin(response.data.status)
            },
            error => {
              setTimeout(() => {
                fetchlogin()
              }, 5000);
              
            })
           
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    setError(false);
      setLoading(true);
    setemailerror(false)
    setpassworderror(false)
    const data = new FormData(event.currentTarget);
    var email=data.get('email');
    var password=data.get('password');
    if(validator.isEmail(email)&&!validator.isEmpty(password) ){
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
        axios.post("/signin-user", {email,password},config)
              .then(response=>{
                setLoading(false);
      setSuccess(response.data.message);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const redirect = urlParams.get('redirect')
      if(redirect){
        window.location.replace(redirect);
      }else{
      window.location.replace("/home");
      }
              },
              error => {
                setLoading(false);
                 if (error.response.data.message) {
                  setError(error.response.data.message);
                 }else{
        setError(error.message);
      }
              })
    }else{
        if(!email){
            setemailerror('Please enter your Email Address.')
            setLoading(false);
        }
        else if(!validator.isEmail(email)){
          setemailerror('Please enter a valid Email Address.')
          setLoading(false);
        }
        else if(validator.isEmpty(password)){
            setpassworderror('Please enter your Password.')
            setLoading(false);
        }
    }
  };

  return (
      <>
      <Header />
        {lloading?(<Container sx={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress color="secondary" /></Container>):(<>
            {login?(<Navigate to="/home" replace />):(<Container component="main" sx={{pb:8}} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{backgroundColor:blue[700],m: 1,color:"white",width:"64px",height:"64px"}} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <TextField
                error={Boolean(emailerror)}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  helperText={emailerror}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                error={Boolean(passworderror)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  helperText={passworderror}
                />
              </Grid>
            </Grid>
            <Box sx={{ m: 1, position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-8px',
              marginLeft: '-12px',
            }}
          />
        )}
            </Box>
            {success&&(<Typography sx={{textAlign:"center",color:"green"}} variant="h6" gutterBottom>
        {success}
      </Typography>)}
            {error&&(<Typography sx={{textAlign:"center",color:"red"}} variant="h6" gutterBottom>
        {error}
      </Typography>)}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  Already have an account? Sign up
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link color="inherit" to="/home">
        Scholastic Approach
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography></Container>)}</>)}
      </>
  );
}