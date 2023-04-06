import {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import MockExam from "./pages/MockExam";
import Mathematics from "./pages/Mathematics";
import English from "./pages/English";
import Physics from "./pages/Physics";
import Chemistry from "./pages/Chemistry";
import Biology from "./pages/Biology";
import GeneralKnowledge from "./pages/GeneralKnowledge"
import Economics from "./pages/Economics"
import Government from "./pages/Government"
import Crs from "./pages/Crs"
import Literature from "./pages/Literature"
import Accounting from "./pages/Accounting"
import Commerce from "./pages/Commerce"

import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import LogOut from "./pages/LogOut"
import Profile from "./pages/Profile"
import Continue from "./pages/Continue"
import CircularProgress from '@mui/material/CircularProgress';
import { Routes, Route, Navigate} from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import {Helmet} from "react-helmet";
import axios from 'axios';
axios.defaults.withCredentials = true

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b1e36",
    },
    secondary: {
      main: blue[700],
    },
    success:{
      main:"#008000"
    },
  },
});

function App() {
  const location = useLocation();
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
  return(
    <ThemeProvider theme={theme}>
    <Routes>
    <Route path="/" element={<Navigate to="/home"/> }/>
    <Route path="/home" element={<><Helmet><title>Home | Scholastic Approach</title></Helmet><Home /></>}/>
    <Route path="/contact-us" element={<><Helmet><title>Contact Us | Scholastic Approach</title></Helmet><Contact /></>} />
    <Route path="/mock-exams" element={<><Helmet><title>Mock Exams | Scholastic Approach</title></Helmet><MockExam /></>} />

    <Route path="/mock-exams/mathematics" element={
    <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
    <CircularProgress color="secondary" /></div>):(<>{login?(
    <><Helmet><title>Mathematics Exam | Scholastic Approach</title></Helmet><Mathematics /></>
        ):(<Continue redirect={location.pathname}/>)}</>)}</>
    } />
    <Route path="/mock-exams/english-language" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
    <><Helmet><title>English Exam | Scholastic Approach</title></Helmet><English /></>
    ):(<Continue redirect={location.pathname}/>)}</>)}</>} />
    <Route path="/mock-exams/physics" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>Physics Exam | Scholastic Approach</title></Helmet><Physics /></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />
    <Route path="/mock-exams/chemistry" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>Chemistry Exam | Scholastic Approach</title></Helmet><Chemistry /></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />
    <Route path="/mock-exams/biology" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(<><Helmet><title>Biology Exam | Scholastic Approach</title></Helmet><Biology /></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />
    <Route path="/mock-exams/general-knowledge" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>General Knowledge Exam | Scholastic Approach</title></Helmet><GeneralKnowledge/></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />

<Route path="/mock-exams/economics" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>Economics Exam | Scholastic Approach</title></Helmet><Economics/></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />

<Route path="/mock-exams/government" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>Government | Scholastic Approach</title></Helmet><Government/></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />

<Route path="/mock-exams/literature" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>Literature-in-English Exam | Scholastic Approach</title></Helmet><Literature/></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />

<Route path="/mock-exams/commerce" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>Commerce Exam | Scholastic Approach</title></Helmet><Commerce/></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />

<Route path="/mock-exams/accounting" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>Accounting Exam | Scholastic Approach</title></Helmet><Accounting/></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />

<Route path="/mock-exams/crs" element={
      <>{lloading?(<div style={{width: "100%",display: "flex",height: "100vh",justifyContent: "center",alignItems: "center"}}>
        <CircularProgress color="secondary" /></div>):(<>{login?(
      <><Helmet><title>CRS Exam | Scholastic Approach</title></Helmet><Crs/></>
      ):(<Continue redirect={location.pathname}/>)}</>)}</>} />

    <Route path="/sign-up" element={<><Helmet><title>Sign Up | Scholastic Approach</title></Helmet><SignUp/></>} />
    <Route path="/sign-in" element={<><Helmet><title>Sign In | Scholastic Approach</title></Helmet><SignIn/></>} />
    <Route path="/logout" element={<><Helmet><title>Log Out | Scholastic Approach</title></Helmet><LogOut/></>} />
    <Route path="/profile" element={<><Helmet><title>Profile | Scholastic Approach</title></Helmet><Profile/></>} />
    
    <Route path="*" element={<Navigate to="/home"/> }/>
</Routes>
</ThemeProvider>
);
}

export default App;
