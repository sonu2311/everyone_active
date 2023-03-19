import {Header} from './header';
import {ResponsiveAppBar} from './header'
import React from 'react';
import {api} from './library';
import './main.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function ForgotPassword() {
  const [email, setEmail]=React.useState("")

  const forgot_password = function(){
    api("/forgot_password", {email:email}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("forgot_password")
        window.location.href = "#/login"
      }
    })
  }
  return (
    <div >
      {/* <Header/> */}
      <ResponsiveAppBar/>
      <div style={{"marginTop": "100px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={1} sm={1} md={3} lg={3}> 
            </Grid>
            <Grid item xs={10} sm={1} md={6} lg={6}>
                <div className='login_header' style={{}}>
                  Forgot Password
                </div>
              <Item>  
                <div style={{"padding":"15px"}}>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  {/* <button className="login_button" onClick={login}>Login</button> */}
                  <Button variant="contained" disableElevation onClick={forgot_password}>
                    Send
									</Button>
                </div>  
              </Item>
            </Grid>
            <Grid item xs={1}  sm={1} md={3} lg={3}>
            </Grid>
          </Grid>
        </Box>
        
      </div>
    </div>
  );
}

export default ForgotPassword;