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
import { Modal, Typography } from '@mui/material';

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
  let [passShow, setPassShow] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleModalClose =() => {
    setOpen(false)
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
              <Input type="email" labeltext="Email Address" variant="standard"/>
              <CustomButton text="Send Link" variant="contained"/>
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
                        <Input name="email" type="email" variant="standard" labeltext="Email Address" style="login_input_field"/>
                      </div>
                      <div>
                        <Input name="password" type={passShow ? "text" : "password"} variant="standard" labeltext="Password" style="login_input_field"/>
                        <button onClick={()=>setPassShow(!passShow)}>Show</button>
                      </div>
                      <CustomButton styleing="loginbtn" variant='contained' text="login to continue"/>
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