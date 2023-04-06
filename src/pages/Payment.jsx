import  React, {useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { PaystackButton } from 'react-paystack'
import "./Continue.css"
axios.defaults.withCredentials = true

export default function Payment() {
    const [lloading, setlloading]= useState(true);
  const [paymentstatus, setpaymentstatus]= useState(false);
   const [paymentdata, setpaymentdata]= useState({});
   const [llloading, setllloading]= useState(false);
   const [vpaymentdata, setvpaymentdata]= useState(false);
   const publicKey ="pk_live_a78496a57dbfa34447acf332044460690fb31bb4"
   const componentProps = {
      email:paymentdata.email,
    phone:paymentdata.phone,
    amount:100000,
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) =>{
      vpayment(reference.reference);},
    onClose: () => {},
}
  useEffect(() => {
    payment();
    },[paymentstatus]);

    const payment=()=>{
      setlloading(true)
      const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
      axios.post("/user-payment-details",config)
            .then(response=>{
              setpaymentstatus(response.data.status);
              setpaymentdata(response.data)
              setlloading(false)
            },
            error => {
              setTimeout(() => {
                payment()
              }, 5000);
              
            })
           
    }
    const vpayment=(reference)=>{
      setllloading(true)
      const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
      axios.post("/confirm-payment",{reference},config)
            .then(response=>{
              setvpaymentdata(response.data)
              setllloading(false)
              window.location.reload();
            },
            error => {
              setTimeout(() => {
                vpayment(reference)
              }, 3000);
              
            })
           
    }

  return (
      <>
      <div className='continue-container'>
      <div className='continue-container-content'>
      {llloading?(<><CircularProgress color="secondary" /><Typography sx={{textAlign:"center"}} color="primary" variant="h6" gutterBottom>
        Verifying Transaction
      </Typography></>):(<>
      {vpaymentdata.status&&(<Typography sx={{textAlign:"center",color:"green"}} variant="h6" gutterBottom>
        {vpaymentdata.message}
      </Typography>)}
      </>)}
        {lloading?(<CircularProgress color="secondary" />):(
        <>
            {!vpaymentdata&&!llloading&&(<>{paymentstatus?(<Navigate to="/home" replace />):(<>
            <div className='continue-content' style={{width:"100%"}}>
            <Container component="main"sx={{mt:"auto",mb:"auto"}}>
              {paymentdata.pastpayment?(<Typography component="h1" variant="h5" gutterBottom>
            Looks like your payment for our Online Mock Examination has expired
          </Typography>):(<Typography component="h1" variant="h5" gutterBottom>
            Looks like you have not paid for our Online Mock Examination
          </Typography>)}
            
            <Typography variant="h6" gutterBottom>
            Price: 	&#8358;1000 (NGN)
          </Typography>
          <Typography variant="h6" gutterBottom>
            Duration: 3 days
          </Typography>
          <Button component={PaystackButton} {...componentProps} variant="contained" sx={{mt:2}} size="large"  maxWidth="sm">
          Pay now
        </Button>
            </Container>
            </div>
            <div></div>
            </>)}</>)}</>
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