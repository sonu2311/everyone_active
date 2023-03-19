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
import {SessionContext} from './library';
import Checkbox from '@mui/material/Checkbox';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '80vh' }} />

      </Container>
    </React.Fragment>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function ResetPassword() {
  const [email, setEmail]=React.useState("")
  const [new_password, setNew_Password]=React.useState("")
  const [repeatNew_Password, setRepeatNew_Password]=React.useState("")
  const [otp, setOtp]=React.useState("")
  const [session, setSession] = React.useContext(SessionContext)
  const[isShowAllInput, setIsShowAllInput]=React.useState(false)
  const[afterResetPasswordLogin, setAfterResetPasswordLogin]=React.useState(false)

  const send_otp_for_reset_password = function(){
    api("/send_otp_for_reset_password", {email:email}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        alert("Send OTP") 
        setIsShowAllInput(true)   
      }
    })
  }

const reset_password = function(){
  if ((isShowAllInput) && (new_password==repeatNew_Password)) {
    api("/reset_password", {email:email, "otp": otp, "new_password": new_password}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setAfterResetPasswordLogin(true)   
      }
    })
  }
}
  
  return (
    <div >
      <ResponsiveAppBar/>
      <div style={{marginTop:"-6px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={1} sm={1} md={8} lg={8} > 
              <div className='boxs hide-xs hide-sm  show-md show-lg login_div_height'>
                <img alt="" style={{"width":"100%"}} src='images/image10.jpg'/>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}  md={4} lg={4}>
              {!afterResetPasswordLogin  && (
                <div className='mt5 p30 boxs login_div_height'>
                  <div className='login_header2' style={{}}>
                    Reset Password
                  </div> 
                  <div className='boxs  pl15 pr15 pb15'>
                    <div className='m3020' style={{}}>
                      <TextField fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='m20'>
                      <Button variant="contained" disableElevation onClick={send_otp_for_reset_password}  style={{"width":"100%","padding":"15px",  "fontSize":"18px",}}>
                        Send OTP
                      </Button>
                    </div>
                    {isShowAllInput &&( 
                      <>
                        <div className='m3020' style={{}}>
                          <TextField fullWidth label="OTP"  type='password' name="OTP"  value={otp} onChange={(e)=> setOtp(e.target.value)} /> 
                        </div> 
                        <div className='m3020' style={{}}>
                          <TextField fullWidth label="New Password"  type='password' name="New password"  value={new_password} onChange={(e)=> setNew_Password(e.target.value)} /> 
                        </div> 
                        <div className='m3020' style={{}}>
                          <TextField fullWidth label="Repeat Password"  type='Repeat password' name="reapet password"  value={repeatNew_Password} onChange={(e)=> setRepeatNew_Password(e.target.value)} /> 
                        </div> 
                        <div className='m20'>
                          <Button variant="contained" disableElevation onClick={reset_password}  style={{"width":"100%","padding":"15px",  "fontSize":"18px",}}>
                            Reset Password
                          </Button>
                        </div>
                      </> 
                    )} 
                  </div>
                </div>
                )} 
                {afterResetPasswordLogin  && (
                  <>
                    <div className=' mt40 p30 boxs login_div_height textac'>Your password has been reset. Please 
                    <a style={{color: "#1976d2", textDecoration: "underline"}}  href={"#/login"} ><span> Login </span> </a>
                    </div> 
                 </>
                )}
            </Grid>
          </Grid>
        </Box> 
      </div>
    </div>
  );
}

export default ResetPassword;