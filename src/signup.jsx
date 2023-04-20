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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function Signup() {
  const [name, setName]= React.useState("")
	const [email, setEmail]= React.useState("")
	const [phone, setPhone]= React.useState("")
	const [password, setPassword]= React.useState("")
  const [session, setSession] = React.useContext(SessionContext)

	const sign_up = function(){	
		api("/sign_up", {name: name, email:email, password:password}, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
			}
			else{
				console.log("sign up successful==",backend_output)
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
            <Grid item  md={8} lg={8} > 
              <div className='hide-xs hide-sm  show-md show-lg '>
                <img alt="" style={{"width":"100%"}} src='images/image10.jpg'/>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}  md={4} lg={4}>
                <div className='mt40 p30 boxs login_div_height'>
                  <div className='textac fs22 fw700 mb20 color333 mt20 fontarial' style={{}}>
                    Signup
                  </div> 
                  <div className='boxs bseee1 br4  pl15 pr15 pb15'>
                    <div className='m3020' >
                      <TextField fullWidth label="Name" type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                    </div>
                    <div className='m3020'>
                      <TextField fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='m3020'>
                      <TextField fullWidth label="Password" type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} onKeyUp={e => { if(e.key == 'Enter') {sign_up()} }} />
                    </div>
                    <div className='m20'>
                      <Button variant="contained" disableElevation onClick={sign_up} style={{"width":"100%","padding":"15px",  "fontSize":"18px",}}>
                        Signup
                      </Button>
                    </div>
                  </div>  
                </div>   
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Signup;