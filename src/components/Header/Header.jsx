import React, { useRef, useState,useEffect } from "react";
import axios from 'axios';
import { Container } from "reactstrap";
import { Link } from 'react-router-dom';
import "./header.css";
import scholasticImg from "../../assests/images/scholasticblueimg.png";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
axios.defaults.withCredentials = true

const navLinks = [
  {
    display: "Home",
    url: "/home",
  },


  {
    display: "Mock Exams",
    url: "/mock-exams",
  },
  {
    display: "Contact Us",
    url: "/contact-us",
  },
  {
    display: "Blog",
    url: "/blog",
  },
];
const Header = () => {
  const menuRef = useRef();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loading, setloading]= useState(true);
  const [login, setlogin]= useState(false);
  const [name, setname]= useState(false);

  useEffect(() => {
    fetchlogin();
    },[]);
  
    const fetchlogin=()=>{
      setloading(true)
      const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
      axios.post("/status",config)
            .then(response=>{
              setloading(false)
              setlogin(response.data.status)
              setname(response.data.name)
            },
            error => {
              setTimeout(() => {
                fetchlogin()
              }, 10000);
              
            })
           
    }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <>
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo" style={{display:"flex"}}>
          <img src={scholasticImg} style={{width:"85px",margin:"5px"}} alt="logo" />
            <h2 className=" d-flex align-items-center gap-1">
            Scholastic Approach    
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
               <Link itemProp="url" to={item.url}>{item.display}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <i className="ri-phone-line"></i> +234 9023397936
              </p>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0,flexDirection:"row",display:"flex",alignItems:"center" }}>
            {loading?(<CircularProgress disableShrink color="secondary" />):(<>
            {login?(<><Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{backgroundColor:blue[700],color:"white"}} />
              </IconButton>
              
            </Tooltip>
            <Typography
            variant="h6"
            noWrap
            sx={{
              ml: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {name}
          </Typography>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <Link to="/profile"><MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem></Link>
                <Link to="/logout"><MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem></Link>
            </Menu></>):(<><Link to="/sign-in"><Button color="secondary" variant="outlined" size="large">
          Sign In
        </Button></Link>
        <Link to="/sign-up"><Button sx={{ml:1}} color="secondary" variant="contained" size="large">
          Sign Up
        </Button></Link></>)}
              
            
            </>)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};

export default Header;
