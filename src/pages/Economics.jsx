import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import "./Exams.css";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Logo from "../assests/images/scholasticwhiteimg.png";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Box from '@mui/material/Box';
import axios from 'axios';
import CircularProgress, {circularProgressClasses} from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import Backdrop from '@mui/material/Backdrop';
import ButtonGroup from '@mui/material/ButtonGroup';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Payment from "./Payment";
axios.defaults.withCredentials = true

class Economics extends React.Component {
 
 constructor(props){
  super(props);
  this.state={
    loading:true,
    error:false,
    questions:[],
    currentQuestion:0,
    time:undefined,
    timer:undefined,
    timertime:[0,0,0],
    interval:undefined,
    backdrop:false,
    backdroperror:false,
    result:false,
    percentage:0,
    options: [],
    ploading:true,
    paidstatus:false
  }
  this.questions=this.questions.bind(this);
  this.next=this.next.bind(this);
  this.previous=this.previous.bind(this);
  this.timer=this.timer.bind(this);
  this.handleRadioChange=this.handleRadioChange.bind(this);
  this.page=this.page.bind(this);
  this.submit=this.submit.bind(this);
  this.shuffle=this.shuffle.bind(this);
 }
 shuffle() {
  var array=['A','B','C','D'];
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  this.setState({options: array});
}
 submit(){
  clearInterval(this.state.interval);
  this.setState({backdrop:true,backdroperror:false});
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
  axios.post("/post-exam-answer", {
    subject:"Economics",
    time:this.state.time,
    questions:this.state.questions
},config)
                .then(
                    response => {
                      this.setState({result:response.data});
                      let interval=5000;
                      let startValue=0;
                      let endValue=response.data.percentage;
                      let duration=Math.floor(interval / endValue);
                      let counter=setInterval(() => {
                        if(startValue<endValue){
                        startValue += 1;
                        this.setState({percentage:startValue})
                        }
                        if(startValue===endValue){
                          clearInterval(counter);
                        }
                      }, duration);
                    },
                    error => {
                      this.setState({backdroperror:true});
                    }
                );
 }
 page(e){
   this.setState({currentQuestion: Number(e.target.value)});
 }
 handleRadioChange = (event) => {
  var answered=this.state.questions;
answered[this.state.currentQuestion].answer=event.target.value
  this.setState({
    questions:answered
  });
};
 timer(){
let [seconds,minutes,hours] = this.state.timertime;
if(seconds===0&&minutes===0&&hours===0){
  this.submit()
}
        if(seconds === 0){
            seconds = 60;
            if(minutes === 0){
                minutes = 60;
                hours--;
            }
            minutes--;
            
        }
        seconds--;
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
   this.setState({timer:` ${h} : ${m} : ${s}`,timertime:[seconds,minutes,hours]});
 }
 next(){
  if(this.state.questions.length-2>=this.state.currentQuestion){
    this.setState({currentQuestion: this.state.currentQuestion+1});}
 }
 previous(){
  if(this.state.currentQuestion-1>=0){
  this.setState({currentQuestion: this.state.currentQuestion-1});}
 }
 questions(){
  this.setState({loading:true,error:false});
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
  axios.post("/exam-questions", {subject:"Economics"},config)
                .then(
                    response => {
                      var answered=[];
                      for(var x in response.data.question){
                        answered=[...answered,{...response.data.question[x],answer:""}]
                      }
                      this.setState({timertime:[Number(response.data.second),Number(response.data.minute),Number(response.data.hour)]});
                      this.setState({
                        questions:answered,
                        loading:false,
                        error:false,
                        time: Date.now(),
                        interval:setInterval(() => {
                          this.timer()
                        }, 1000)
                      });
                    },
                    error => {
                      this.setState({error:true});
                    }
                );
 }
 payment(){
  this.setState({ploading:true});
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };
  axios.post("/user-payment",config)
                .then(
                    response => {
                      if(response.data.status){
                        this.questions()
  this.shuffle()
                      }
                     this.setState({
                        ploading:false,
                        paidstatus:response.data.status
                      });
                    },
                    error => {
                      setTimeout(() => {
                        this.payment()
                      }, 5000);
                    }
                );
 }
 componentWillMount(){
  this.payment()
  }
render(){
  return (
    <Fragment>
    <div className="quiz-container">
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent:"center"}}>
        <img src={Logo} style={{width:"85px",margin:"10px"}} alt="logo" />
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Scholastic Approach
          </Typography>
    </Toolbar>
    </Container>
    </AppBar>
      {this.state.ploading?(
    <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />)
    :(<>{this.state.paidstatus?(<>
      {this.state.loading?(<>
       
    {this.state.error?(<div onClick={this.questions} style={{width:"100%",alignItems:"center",height:"100vh",justifyContent:"center",display:"flex",flexDirection:"column"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z" fill="#0b1e36" />
              <path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z" fill="#0b1e36" />
              </svg>
             <h3 style={{textAlign:"center" }}>An Error Occured. <span style={{ color: "blue" }}>Try Again</span></h3>
              </div>):(<CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />)}
      </>):(<>
        {this.state.questions.length>>0?( 
          <>{this.state.result?(
          <Container maxWidth="xl" sx={{paddingTop:"30px",paddingBottom:"30px"}}>
            <h2>Economics EXAM RESULT</h2>
            <Box sx={{ position: 'relative',marginTop:"20px",display: 'flex',justifyContent:"center" }}>
            <CircularProgress variant="determinate" size={150} sx={{color: "#008000",display:"flex",[`& .${circularProgressClasses.circle}`]: {strokeLinecap: 'round',}}} value={this.state.percentage} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" >
                {`${Math.round(this.state.percentage)}%`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%",marginTop:"15px",display:"flex",justifyContent:"center" }}>
          <Typography variant="h6" gutterBottom>
            You got 
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight={"bold"} sx={{marginLeft:"10px",color: "#008000"}}>{this.state.result.correct}/{this.state.result.total}</Typography>
          </Box>
          <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
          <ButtonGroup orientation="vertical" variant="text" size="large" color="primary">
        <Button sx={{justifyContent:"flex-start"}} startIcon={<TimerIcon />}>Time used: {this.state.result.time}</Button>
        <Button sx={{justifyContent:"flex-start"}} startIcon={<CheckBoxIcon />}>No of questions attempted: {this.state.result.attempted}</Button>
        <Button sx={{justifyContent:"flex-start"}} startIcon={<SkipNextIcon />}>No of questions skipped: {this.state.result.skipped}</Button>
      </ButtonGroup>
      </Box>
          </Container>
          ):(<Container maxWidth="xl" sx={{paddingTop:"30px",paddingBottom:"30px"}}>
          <Box sx={{ width: "100%",marginTop:"15px",display:"flex",justifyContent:"space-between",flexWrap:"wrap" }}>
     <h1>Economics EXAM</h1>
     <Button onClick={this.submit} color="success" sx={{marginBottom:"10px"}} variant="contained" size="large" startIcon={<CheckIcon />}>
       Submit
     </Button>
     </Box>
     <div className="quiz-main">
     <h3>Question {this.state.currentQuestion+1} of {this.state.questions.length}:</h3>
     <p>{this.state.questions[this.state.currentQuestion].question}</p>
     <FormControl sx={{width:"100%"}}>
     <RadioGroup
       aria-labelledby="demo-radio-buttons-group-label"
       value={this.state.questions[this.state.currentQuestion].answer}
       onChange={this.handleRadioChange}
       name="radio-buttons-group"
     >{
      this.state.options.map((option,id) => (
        <FormControlLabel key={id} value={this.state.questions[this.state.currentQuestion][option]} className="quiz-option" control={<Radio />} label={this.state.questions[this.state.currentQuestion][option]} />
      ))
     }
     </RadioGroup>
   </FormControl>
   <Box sx={{ width: "100%",marginTop:"15px",display:"flex",justifyContent:"space-between",flexWrap:"wrap" }}>
   <Button onClick={this.previous} sx={{marginBottom:"10px"}} variant="outlined" size="large" startIcon={<NavigateBeforeIcon />}>
       Previous
     </Button>
     <Button onClick={this.next} sx={{marginBottom:"10px"}} variant="outlined" size="large" endIcon={<NavigateNextIcon />}>
       Next
     </Button>
     </Box>
     <Typography variant="h6" sx={{userSelect: "none",textAlign:"center"}} gutterBottom>
      <AccessTimeIcon />
     {this.state.timer}
     </Typography>
     <Box sx={{ width: "100%",marginTop:"15px",display:"flex",flexWrap:"wrap" }}>
      <ul className="quiz-pagination-ul">
      {this.state.questions.map((data, i) => {
        return(
        <li key={i}><button onClick={this.page} value={i} className={`quiz-pagination${this.state.questions[i].answer?" answered":""}${this.state.currentQuestion===i?" active":""}`}>{i+1}</button></li>
        )
          }
          )}
      </ul>
      
      </Box>
  <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.backdrop}
        >{this.state.backdroperror?(<div onClick={this.submit} style={{width:"100%",alignItems:"center",height:"100vh",justifyContent:"center",display:"flex",flexDirection:"column"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z" fill="white" />
                <path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z" fill="white" />
                </svg>
               <h3 style={{textAlign:"center",color:"white" }}>An Error Occured. <span style={{ color: "blue" }}>Try Again</span></h3>
                </div>):(<CircularProgress color="inherit" />)}
          
        </Backdrop>
     </div>
     </Container>)}</>
        ):(<Typography variant="h5" sx={{textAlign:"center",marginTop:"50px"}} gutterBottom>
        No questions on Economics for now...
      </Typography>)}
   
      </>)}</>):(<Payment/>)}</>)}
    
    
    </div>
    </Fragment>
  );
}
};

export default Economics
