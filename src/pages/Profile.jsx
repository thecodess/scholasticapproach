import  React, {useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Header from "../components/Header/Header";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import PercentIcon from '@mui/icons-material/Percent';
import TimerIcon from '@mui/icons-material/Timer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SubjectIcon from '@mui/icons-material/Subject';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
axios.defaults.withCredentials = true

export default function Profile() {
    const [lloading, setlloading]= useState(true);
    const [login, setlogin]= useState(false);
    const [data, setdata]= useState({});

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
      axios.post("/user-profile",config)
            .then(response=>{
              setlogin(response.data.status)
              setlloading(false)
              setdata(response.data);
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
        <Container sx={{display:"flex",justifyContent:"center",alignItems:"center"}} maxWidth="sm">
        {lloading?(<Container sx={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress color="secondary" /></Container>):(<>
            {login?(<Box
          sx={{
            width:"100%",
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{backgroundColor:blue[700],m: 1,color:"white",width:"64px",height:"64px"}} />
          <Typography component="h1" variant="h5">
            {data.name}
          </Typography>
          <Box sx={{ mt: 3,width:"100%" }}>
              <Typography component="h1" sx={{textAlign:"left"}} variant="h6">
            First Name: {data.firstName}
          </Typography>
          <Typography component="h1" sx={{textAlign:"left"}} variant="h6">
            Last Name: {data.lastName}
          </Typography>
          <Typography component="h1" sx={{textAlign:"left"}} variant="h6">
            Email: {data.email}
          </Typography>
          <Typography component="h1" sx={{textAlign:"left"}} variant="h6">
            Phone Number: {data.phone}
          </Typography>
          <Typography component="h1" sx={{textAlign:"left"}} variant="h6">
            User Id: {data.userId}
          </Typography>
          </Box>
          <Box sx={{mt:5,display:"flex",flexDirection:"column",width:"100%"}}>
           <Typography component="h1" sx={{textAlign:"left",mb:1,fontWeight:"bold"}} variant="h5">
            Mock Exam Results
          </Typography>
          {data.results.length !== 0?(<>{data.results.map((datas,index)=>{
              return(
                <Card key={index} variant="outlined" sx={{mb:1,mt:1}}>
      <CardContent>
        <Box sx={{width: '100%',display:"flex",flexWrap:"wrap"}}>
        <Chip icon={<SubjectIcon />} sx={{m:0.5,borderRadius:0}} color="primary"variant="outlined" label={`Subject: ${datas.subject}`} />
      <Chip icon={<TimerIcon />}sx={{m:0.5,borderRadius:0}} color="secondary"variant="outlined" label={`Time Spent: ${datas.timespent}`} />
      <Chip icon={<CheckBoxIcon />}sx={{m:0.5,borderRadius:0}} color="success"variant="outlined" label={`Score: ${datas.correctlyanswered}/${datas.totalquestions}`} />
      <Chip icon={<AssignmentTurnedInIcon />}sx={{m:0.5,borderRadius:0}}variant="outlined" label={`Attempted Questions: ${datas.attemptedquestions}`} />
      <Chip icon={<SkipNextIcon />}sx={{m:0.5,borderRadius:0}} color="error"variant="outlined" label={`Skipped Questions: ${datas.skippedquestions}`} />
      <Chip icon={<PercentIcon />}sx={{m:0.5,borderRadius:0}} color="success"variant="outlined" label={`Percentage: ${datas.percentage}%`} />
      </Box>
    </CardContent>
    </Card>
            )}
            )}</>):(<Typography component="h1" sx={{textAlign:"left"}} variant="h6">
            No Results for now...
          </Typography>)}
            
    </Box>
          <Box sx={{mt:5,display:"flex",flexDirection:"column",width:"100%"}}>
           <Typography component="h1" sx={{textAlign:"left",mb:1,fontWeight:"bold"}} variant="h5">
            Recent Payments
          </Typography>
          {data.data?(<>{data.data.map((datas,index)=>{
              return(
                <Card variant="outlined" key={index} sx={{mb:1,mt:1}}>
      <CardContent>
        <Box sx={{display:"flex",width: '100%'}}>
        <Typography component="div">
      Status: <Chip label={datas.status}style={{backgroundColor: `${datas.status==='success'?"#3bb75e":
    datas.status==='failed'?"#f05051":
    datas.status==='abandoned'&&"#919191"}`,color:"white",textTransform:"capitalize"}} />
      </Typography>
      <Typography sx={{ ml:1 }}component="div">
      Channel: <Chip label={datas.channel}style={{border: "1px solid #1976d2",color:"black",textTransform:"capitalize",backgroundColor:"white"}} />
      </Typography>
      </Box>
      <Typography sx={{ fontSize: 14, mt:1 }} color="secondary"component="div" gutterBottom>
        Reference: {datas.reference}
      </Typography>
      <Typography variant="body2"component="div">
       Created At: {moment(new Date(datas.created_at)).format('LLLL')}
       <br />
       {datas.paid_at&&(<>Paid At: {moment(new Date(datas.paid_at)).format('LLLL')}</>)}
      </Typography>
      <Typography variant="body2"component="div">
       Payment Expired: {datas.expired.toString()}
      </Typography>
    </CardContent>
    </Card>
            )}
            )}</>):(<Typography component="h1" sx={{textAlign:"left"}} variant="h6">
            No Payments Reciept for now...
          </Typography>)}
            
    </Box>
        </Box>):(
            <Navigate to="/home" replace />
        )}</>)}
           </Container>
      </>
  );
}