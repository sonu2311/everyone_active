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
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function AdminManageMemberships(){
	const [name, setName]= React.useState("")
  const [description, setDescription]= React.useState("")
  const [teacherId, setTeacherId]= React.useState("")
  const [requiresRegistration, setRequiresRegistration]= React.useState(false)
  const [teachersList, setTeachersList] = React.useState([]);
  const [files, setFiles] = React.useState([])
  const [paymentFrequency, setPaymentFrequency]= React.useState("")
  
  // “/add_studio”,
  // “/get_all_studios”, 
  // “/update_studio”,
  // “/delete_studio”.
  
	React.useEffect(()=> {
    api("/admin_get_all_teachers", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("admin_get_all_teachers=== ",backend_output.all_teachers )
        setTeachersList(backend_output.all_teachers)
      } 
    })
  },[])

	const adminAddNewCourse = function(){	
		api("/admin_create_new_course", {name: name, description:description, teacher_id:teacherId,requires_registration: requiresRegistration  }, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
				console.log("Teacher added.")
				window.location.href = "#/all_courses"
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
          setFiles([...files, {"link": backend_output.uploaded_filename,"filename": file.name} ])
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
                <div className='login_header' style={{}}>
                  Add New course
                </div>
              <Item>  
                <div style={{"padding":"15px"}}>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Plan Name" type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Price" type="number" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
                  </div>
									<div style={{"margin":"20px"}}>
                    <TextField
                      fullWidth
                      id="outlined-multiline-flexible"
                      label="Terms"
                      multiline
                      maxRows={4}
                      value={description} onChange={(e)=>setDescription(e.target.value)}
                    />
                  </div>
                  <div className=' boxs mb10 m20 textal' style={{width:"200px"}}>
                    <div >
                      <FormControl sx={{  minWidth: 200 }}  size="small">
                        <InputLabel id="demo-select-small">Payment Frequency</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={paymentFrequency}
                          label="Payment Frequency"
                          onChange={(e) => setPaymentFrequency(e.target.value)}
                        >
                          <MenuItem className='answertype' value={"FREE"} >{"FREE"}</MenuItem>
                          <MenuItem className='answertype' value={"ONE_TIME"} >{"ONE_TIME"}</MenuItem>
                          <MenuItem className='answertype' value={"MONTHLY"} >{"MONTHLY"}</MenuItem>
                          <MenuItem className='answertype' value={"YEARLY"} >{"YEARLY"}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className='mt20 mb20 ml20 mr20 textal' style={{}}>
                    <input type="file"
                      onChange={(e) => uploadFile(e.target.files[0])} />
                  </div>  
                  
                  <div className='textal ' style={{marginLeft:"20px"}}>
                    <FormControl sx={{  minWidth: 330 }} size="small" >
                      <InputLabel id="demo-simple-select-label">Teachers Name</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={teacherId}
                        label="setTeachersId"
                        onChange={(e)=>setTeacherId(e.target.value)}
                        className="selecter"
                      >
                        {teachersList.map((x)=>(
                          <MenuItem value={x.id}>{x.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                 
                  <div className='textal p1_8 mb10 ' style={{}}>
                    <Checkbox {...label}  checked={requiresRegistration} onChange={(e)=>setRequiresRegistration(e.target.checked)}/> 
                    <span className='private_name' value={requiresRegistration} onChange={(e)=>setRequiresRegistration(e.target.value)}>
                       Private
                    </span>
                  </div>
                  <div className='textal p20'>
                    <Button variant="contained" disableElevation onClick={adminAddNewCourse}>
                      Add Course
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

export default AdminManageMemberships;