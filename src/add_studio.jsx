import {ResponsiveAppBar} from './header'
import React from 'react';
import {api} from './library';
import './main.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function AddStudio(){
	const [studiosName, setStudiosName]= React.useState("")
  const [address, setAddress]= React.useState("")
  const [capacity, setCapacity]= React.useState("") 
  const [files, setFiles] = React.useState([])
  const [picture, setPicture]= React.useState("")
  
	
  const adminAddNewStudio = function(){	
		api("/add_studio", {name:studiosName, address:address, capacity:capacity,picture:picture }, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
				console.log("studio added.===",backend_output )
				window.location.href = "#/Admin_manage_studio"
			}
		})
	}

  const uploadFile = function(file) {
    if (!file) return;
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      var file_content = reader.result
      api('/upload_file',
        {
          "file_content": file_content,
          "filename": file.name
        },
        function(backend_output){
          setPicture(backend_output.uploaded_filename)
        });
    }
  }
	return (
		<div>
			<ResponsiveAppBar/>
      <div style={{"marginTop": "100px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={1} sm={1} md={3} lg={3}> 
            </Grid>
            <Grid item xs={10} sm={10} md={6} lg={6}>
                <div className='login_header2 ' style={{}}>
                  Add New studio
                </div>
              <Item>  
              <div style={{"padding":"15px"}}>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Studios Name" type="text" name="name" value={studiosName} onChange={(e)=> setStudiosName(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Address" type="text" name="name" value={address} onChange={(e)=> setAddress(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Capacity" type="number" name="name" value={capacity} onChange={(e)=> setCapacity(e.target.value)} />
                  </div>
                  <div className='mt20 mb20 ml20 mr20 textal' style={{}}>
                    <input type="file"
                      onChange={(e) => uploadFile(e.target.files[0])} />
                  </div>
                  <div className='boxs imagewidth textac'>
                    {picture.length>0 &&(
                      <img style={{ width: '150px', verticalAlign: 'middle'}} 
                      src={picture} />
                    )} 
                  </div>   
                  <div className='textal p20'>
                    <Button variant="contained" disableElevation onClick={adminAddNewStudio}>
                      Add Studio
                    </Button>
                  </div>
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

export default AddStudio;