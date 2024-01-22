import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./login.css"
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/google.svg';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import AuthNavigate from '../../components/AuthNavigate';
import LoginImg from '../../assets/images/hero.jpg'
import Image from '../../utilities/Image';
import { Alert, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let [passShow, setPassShow] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleModalClose =() => {
    setOpen(false)
  }
  let [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  let [error, setError] = useState({
    email: "",
    password: ""
  })
  let [forgetformData, setforgetFormData] = useState({
    email: "",
  })
  let [forgeterror, setforgetError] = useState({
    email: "",
  })


  let handleLoginForm = (e) =>{
    let {name, value} = e.target
    setFormData({
      ...formData,[name]:value
    })
  }


  let handleLoginSubmit = () => {
    if(!formData.email){
      setError({email: "email ny"});
    }
    else if(!formData.email.match(emailregex)){
      setError({email: "email format thik ny"});
    }else if(!formData.password){
      setError({email: ""});
      setError({password: "pass ny"});
    }else{
      setError({
        email: "",
        password: ""
      })
      console.log(formData);
    }
  }

  let handleForgotData = (e) => {
    let {name, value} = e.target
    setforgetFormData({
      ...forgetformData,[name]:value
    })
  }

  let handleForgotSubmit = () => {
    if(!forgetformData.email){
      setforgetError({email: "forget email ny"});
    }else if(!forgetformData.email.match(emailregex)){
      setforgetError({email: "email format thik ny"});
    }else{
      setforgetError({email: ""})
      console.log(formData);
    }
  }


  return (
    <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <button onClick={handleModalClose}>Close</button>
            <div className='forgot_box'>
              <h2>Forgot Password</h2>
              <div>
                <Input name="forgot" onChange={handleForgotData} type="email" labeltext="Email Address" variant="standard"/>
                  {forgeterror.email &&
                      <Alert severity="error">{forgeterror.email}</Alert>
                    }
              </div>
              <CustomButton onClick={handleForgotSubmit} text="Send Link" variant="contained"/>
            </div>
          </Box>
        </Modal>
         <Box>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className='loginbox'>
                  <div className='loginbox__inner'>
                    <SectionHeading style="auth_heading" text="Login to your account!"/>
                    <div className='provider_login'>
                        <img src={GoogleSvg}/>
                        <span>Login with Google</span>
                    </div>
                    <div className='form_main'>
                      <div>
                        <Input onChange={handleLoginForm} name="email" type="email" variant="standard" labeltext="Email Address" style="login_input_field"/>
                        {error.email &&
                          <Alert severity="error">{error.email}</Alert>
                        }
                      </div>
                      <div>
                        <Input onChange={handleLoginForm} name="password" type={passShow ? "text" : "password"} variant="standard" labeltext="Password" style="login_input_field"/>
                        <button onClick={()=>setPassShow(!passShow)}>Show</button>
                        {error.password &&
                          <Alert severity="error">{error.password}</Alert>
                        }
                      </div>
                      <CustomButton onClick={handleLoginSubmit} styleing="loginbtn" variant='contained' text="login to continue"/>
                    </div>
                    <AuthNavigate style="loginauth" link="/registration" linktext="sing up" text="Don't have an account?"/>
                    {/* <AuthNavigate style="loginauth" linktext="Forget Password" text="Password vulea gaco?"/> */}
                    <p className='loginauth'>
                      Password vulea gaco?
                      <span onClick={handleOpen}>Forget Password</span>
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className='loginimg'>
                    <Image source={LoginImg} alt="img"/>
                </div>
              </Grid>
             
            </Grid>
        </Box>
        
    </>
  )
}

export default Login