import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import SectionHeading from '../../components/SectionHeading'
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton'
import AuthNavigate from '../../components/AuthNavigate'
import Alert from '@mui/material/Alert';

const Registraion = () => {
  let [error, setError] = useState({
    email: "",
    fullname: "",
    password: ""
  })
  let [signupData, setSignupData] = useState({
    email: "",
    fullname: "",
    password: ""
  })

  let handleForm = (e) =>{
    let {name, value} = e.target
    setSignupData({
      ...signupData,[name]:value
    })
  }

  let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  let handleSubmit = () => {
    if(!signupData.email){
      setError({email: "email ny"});
    }
    else if(!signupData.email.match(emailregex)){
      setError({email: "email format thik ny"});
    }
    else if(!signupData.fullname){
      setError({email: ""});
      setError({fullname: "name ny"});
    }else if(!signupData.password){
      setError({fullname: ""});
      setError({password: "pass ny"});
    }else{
      setError({
        email: "",
        fullname: "",
        password: ""
      })
      console.log(signupData);
    }
  }

  return (
    <Box>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <div className='loginbox'>
              <div className='loginbox__inner'>
                <SectionHeading style="auth_heading" text="Get started with easily register"/>
                <div className='form_main'>
                  <div>
                    <Input onChange={handleForm} name="email" type="email" variant="outlined" labeltext="Email Address" style="login_input_field"/>
                    {error.email &&
                      <Alert severity="error">{error.email}</Alert>
                    }
                  </div>
                  <div>
                    <Input onChange={handleForm} name="fullname" type="text" variant="outlined" labeltext="Full Name" style="login_input_field"/>
                    {error.fullname &&
                      <Alert severity="error">{error.fullname}</Alert>
                    }
                  </div>
                  <div>
                    <Input onChange={handleForm} name="password" type="password" variant="outlined" labeltext="Password" style="login_input_field"/>
                    {error.password &&
                      <Alert severity="error">{error.password}</Alert>
                    }
                  </div>
                  <CustomButton onClick={handleSubmit} styleing="loginbtn" variant='contained' text="sing up"/>
                </div>
                <AuthNavigate style="loginauth" link="/" linktext="sing in" text="Already have an account?"/>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='loginimg'>
                {/* <Image source={LoginImg} alt="img"/> */}
            </div>
          </Grid>
          
        </Grid>
    </Box>
  )
}

export default Registraion