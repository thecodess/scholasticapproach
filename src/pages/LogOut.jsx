import  React, {useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Header from "../components/Header/Header";
import Typography from '@mui/material/Typography';
axios.defaults.withCredentials = true

export default function LogOut() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
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
      axios.post("http://localhost:5000/status",config)
            .then(response=>{
              setlogin(response.data.status)
              setlloading(false)
              
              if(response.data.status){
                logout();
            }
              
            },
            error => {
              setTimeout(() => {
                fetchlogin()
              }, 5000);
              
            })
           
    }
    const logout=()=>{
        setLoading(true)
        const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
        axios.post("http://localhost:5000/logout-user",config)
              .then(response=>{
                setLoading(false)
                setSuccess(response.data.message)
                const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const redirect = urlParams.get('redirect')
      if(redirect){
        window.location.replace(`/${redirect}`);
      }else{
      window.location.replace("/home");
      }
              },
              error => {
                setTimeout(() => {
                  logout()
                }, 3000);
                
              })
             
      }

  return (
      <>
      <Header />
        <Container sx={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            {lloading?(<CircularProgress color="secondary" />):(<>
            {login?(<>
                {loading?(<CircularProgress color="secondary" />):(<>
                {success&&(<Typography sx={{textAlign:"center",color:"green"}} variant="h6" gutterBottom>
        {success}
      </Typography>)}
                    
                </>)}
                </>):(<Navigate to="/home" replace />)}
                </>)}</Container>
      </>
  );
}