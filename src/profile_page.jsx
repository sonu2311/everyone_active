import React from 'react';
import {api} from './library';
import './main.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {ResponsiveAppBar} from './header'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { SessionContext } from "./library";
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  const UpdatePassword= function(){
  const[isShowPassword, setIsShowPassword]=React.useState(false)
  const[newPassword, setNewPassword]=React.useState("")
  const[oldPassword, setOldPassword]=React.useState("")
  const[repeatPassword, setRepeatPassword]=React.useState("")
//   # An API for changing password.
// #
// # Sample input: {"old_password": "password1",
// #                "new_password": "password2",
// #                "repeat_password": "password2"}
// # Possible Output: {}
// # Possible Output: {"error": "Old password is not correct."}


  const update_password=function(){
    
    api('/update_password', {"old_password":oldPassword, "new_password":newPassword, "repeat_password":repeatPassword},function(backend_output) {
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setOldPassword("")
        setNewPassword("")
        setRepeatPassword("")
				alert("update password")
      }
    })
  }

	return (	
    <div className='m40 ' style={{}}>
      <Card sx={{  }}>
        <CardContent>
          <div className='profiledetailsheader themecolor2 ' style={{}}>
          Change Password
          </div>
          
          <div className='m4020'>
            <TextField fullWidth label="Old Password" type={isShowPassword ? 'text':'password'} name="password" value={oldPassword} onChange={(e)=> setOldPassword(e.target.value)} />
          </div>
          <div className='m4020'>
            <TextField fullWidth label="New Password" type={isShowPassword ? 'text':'password'} name="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
          </div>
          <div className='m4020'> 
            <TextField fullWidth label="Repeat Password" type={isShowPassword ? 'text':'password'}  name="password" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} /> 
          </div>
            
          <div className='m10 textal ' >
            <Checkbox {...label}  checked={isShowPassword} onChange={(e)=>setIsShowPassword(e.target.checked)}/> Show Password
          </div>
        </CardContent>
        <CardActions>
          <div className='p2030 textal'  >
            <Button variant="contained" disableElevation onClick={update_password}>
              Update Password
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>      
	);
}

export function ProfileDetails(){
  const {id} = useParams()
	const[profilePic, setProfilePic] = React.useState("")
  const [session, setSession] = React.useContext(SessionContext)
  const [email, setEmail]=React.useState("")
  const [role, setRole]=React.useState("")
  const [name, setName]=React.useState("")
 
  React.useEffect(()=>{
    api('/get_user_profile', {"user_id": parseInt(id) },function(backend_output) {
      if("error" in backend_output){
        alert(backend_output.error) 
      }
      else{
        setEmail(backend_output.user_info.email)
        setName(backend_output.user_info.name)
        setRole(backend_output.user_info.role)
        console.log('backend_output.user_info.email', backend_output)
      }	
    }) 
  }, [id])

  const profileDetailUpdate = function(){
    api('/update_user_details',{"name":name, "email":email, "role": role, profile_pic:profilePic}, function(backend_output){
      setSession(backend_output.session)
    });
  }

	return (
    <div className='m40 ' style={{}}>
      <Card sx={{  }}>
        <CardContent>
          <div className='profiledetailsheader themecolor2' style={{}}>
            Profile Details
          </div> 
          <div className='m4020' style={{}}>
            <TextField disabled="true" fullWidth label="Name" type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
          </div>
          <div className='m4020'>
            <TextField disabled="true" fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div> 
          <div className='m4020'>
            <TextField disabled="true" fullWidth label="Role" value={role} onChange={(e)=>setRole(e.target.value)} />
          </div>   
        </CardContent>
      </Card>
    </div>    
	);
}


export function EditProfile() {
  const {id} = useParams()
  const [session, setSession] = React.useContext(SessionContext) 
  return (
    <>
      <ResponsiveAppBar/>
      <div className='p7040 mt40 ' style={{}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container  >
            <Grid item xs={1} sm={1} md={2} lg={2}> 
            </Grid>
            <Grid item xs={10} sm={10} md={8} lg={8}>  
              {(session.login_key.id == id || session.login_key.role=="ADMIN" ) &&(
                <ProfileDetails/>
              )}
              {session.login_key.id==id &&(   
                <UpdatePassword/>
              )}
            </Grid>
            <Grid item xs={1}  sm={1} md={2} lg={2}>
            </Grid>
          </Grid>
        </Box> 
      </div>	
    </>
  );
}

export default EditProfile