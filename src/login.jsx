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


function Login() {
  const [email, setEmail]=React.useState("")
  const [password, setPassword]=React.useState("")
  const [session, setSession] = React.useContext(SessionContext)
  const[isShowPassword, setIsShowPassword]=React.useState(false)

  const login = function(){
    api("/login", {email:email, password:password}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("Login successful !")
        setSession(backend_output.session)
        window.location.href = "#/all_courses"
      }
    })
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
                
              {/* <Item> */}
                <div className='mt5 p30 boxs login_div_height'>
                  <div className='login_header2' style={{}}>
                    Login
                  </div> 
                  <div className='boxs  pl15 pr15 pb15'>
                    <div className='m3020' style={{}}>
                      <TextField fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='m3020' style={{}}>
                      <TextField fullWidth label="Password"  type={isShowPassword ? 'text':'password'} name="password"  value={password} onChange={(e)=> setPassword(e.target.value)} onKeyUp={e => { if(e.key == 'Enter') {login()} }} /> 
                    </div>
                    <div className='m10 textal ' >    
                      <Checkbox {...label}  checked={isShowPassword} onChange={(e)=>setIsShowPassword(e.target.checked)}/> Show Password
                    </div>
                    <div className='m20 mb30 mt30 textal hsplit fs15 ' >
                      <div style={{color:"red"}}>
                        <a href={"#/signup"} style={{color: "#1976d2", textDecoration: "underline"}}>
                          Signup
                        </a>
                      </div>
                      <div className='' style={{float:"right"}}>
                        <a  href={"#/reset_password/"} style={{color: "#1976d2", textDecoration: "underline"}}>
                          Forget Password
                          </a>
                      </div>
                    </div>
                    <div className='m20'>
                      <Button variant="contained" disableElevation onClick={login}  style={{"width":"100%","padding":"15px",  "fontSize":"18px",}}>
                        Login
                      </Button>
                    </div>  
                  </div>
                </div>   
              {/* </Item> */}
            </Grid>
            {/* <Grid item xs={1}  sm={1} md={3} lg={3}>
            </Grid> */}
          </Grid>
        </Box>
        
      </div>
    </div>
  );
}

export default Login;