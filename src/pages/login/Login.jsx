import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./login.css"
import SectionHeading from '../../components/SectionHeading';
import GoogleSvg from '../../../public/google.svg';
import Button from '@mui/material/Button';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 5,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});

const CustomButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 50,
  padding: '20px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: 'red',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: 'yellow',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const Login = () => {
  return (
    <>
         <Box>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className='loginbox'>
                  <div>
                  <CustomButton variant="contained">
                    Bootstrap
                  </CustomButton>
                    <Button color="error" variant="contained">amader button</Button>
                    <SectionHeading style="auth_heading" text="Login to your account!"/>
                    <div className='provider_login'>
                        <img src={GoogleSvg}/>
                        <span>Login with Google</span>
                    </div>
                    <div className='form_main'>
                      <TextField fullWidth id="outlined-basic" label="Email Address" variant="standard" />
                      <ValidationTextField
                        label="CSS validation style"
                        required
                        variant="outlined"
                        defaultValue="Success"
                        id="validation-outlined-input"
                      />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className='loginimg'>

                </div>
              </Grid>
             
            </Grid>
        </Box>
    </>
  )
}

export default Login