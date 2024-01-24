import { Box, Grid } from '@mui/material'
import Alert from '@mui/material/Alert'
import { createUserWithEmailAndPassword, getAuth,sendEmailVerification,updateProfile  } from "firebase/auth"
import React, { useState } from 'react'
import { Audio, ColorRing } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom"
import AuthNavigate from '../../components/AuthNavigate'
import CustomButton from '../../components/CustomButton'
import Input from '../../components/Input'
import SectionHeading from '../../components/SectionHeading'
import { getDatabase, ref, set } from "firebase/database";

const Registraion = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)

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
      setLoader(true)
      setError({
        email: "",
        fullname: "",
        password: ""
      })

      createUserWithEmailAndPassword(auth, signupData.email, signupData.password).then((userCredential)=>{
        sendEmailVerification(auth.currentUser).then(()=>{
          updateProfile(auth.currentUser,{
            displayName: signupData.fullname,
            photoURL: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          }).then(()=>{
            set(ref(db, 'users/' + userCredential.user.uid), {
              username: userCredential.user.displayName,
              email: userCredential.user.email,
              profileimg : userCredential.user.photoURL
            }).then(()=>{
              navigate("/")
              console.log(userCredential);
            })
          })
        })
      }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/email-already-in-use"){
          setError({email: "email already existed"});
        }else{
          setError({email: ""});
        }
      })
      setSignupData({
        email: "",
        fullname: "",
        password: ""
      })
      setTimeout(()=>{
        setLoader(false)
      },2000)
      // console.log(signupData);
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
                    <Input onChange={handleForm} name="email" value={signupData.email} type="email" variant="outlined" labeltext="Email Address" style="login_input_field"/>
                    {error.email &&
                      <Alert severity="error">{error.email}</Alert>
                    }
                  </div>
                  <div>
                    <Input onChange={handleForm} name="fullname" value={signupData.fullname} type="text" variant="outlined" labeltext="Full Name" style="login_input_field"/>
                    {error.fullname &&
                      <Alert severity="error">{error.fullname}</Alert>
                    }
                  </div>
                  <div>
                    <Input onChange={handleForm} name="password" value={signupData.password} type="password" variant="outlined" labeltext="Password" style="login_input_field"/>
                    {error.password &&
                      <Alert severity="error">{error.password}</Alert>
                    }
                  </div>
                  {loader ?
                    <>
                     <Audio
                     height="80"
                     width="80"
                     radius="9"
                     color="green"
                     ariaLabel="loading"
                     wrapperStyle
                     wrapperClass
                   />
                     <ColorRing
                     visible={true}
                     height="80"
                     width="80"
                     ariaLabel="color-ring-loading"
                     wrapperStyle={{}}
                     wrapperClass="color-ring-wrapper"
                     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                   />
                    </>
                   :
                   <CustomButton onClick={handleSubmit} styleing="loginbtn" variant='contained' text="sing up"/>

                  }
                 
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