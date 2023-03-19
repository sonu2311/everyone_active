import {ResponsiveAppBar} from './header'
import React from 'react';
import {api} from './library';
import './main.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export function Row({row}) {
  const [trainerId, setTrainerId]= React.useState(row.id)
  const [trainerName, setTrainerName]= React.useState(row.name)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
   
  const update_trainer = function(){	
    api("/update_trainer", {id:trainerId, name:trainerName }, 
      function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{ 
        setIsUpdate(false)
        console.log("studio updated.===",backend_output )
        console.log("setIsUpdate===",isUpdate )
      }
    })
  }

  const delete_trainer = function(){	
    api("/delete_trainer", {id:trainerId }, function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{
        setIsDeleted(true)
        console.log("studio updated.===",backend_output )
        console.log("setIsUpdate===",isUpdate )
      }
    })
  }

  const trainer_edit_input_on =function(){
    setIsUpdate(true)
  }


  // if (isDeleted){
  //   return <></>
  // }
  return (
    <>
    {(!isDeleted) &&(
    <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={trainer_edit_input_on} >
            edit
          </Button> 
        </TableCell>  
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <a href= {"#/manage_schedule/"+row.id}  >
              {trainerName}
            </a>
          )}
          {isUpdate && (
            <TextField  label="Studio Name" type="text" name="name" value={trainerName} onChange={(e)=> setTrainerName(e.target.value)} />           
          )}
        </TableCell>
        {/* <TableCell  align="center" scope="row"> 
          {trainerId}
        </TableCell> */}
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={update_trainer} >
            Save
          </Button> 
        </TableCell>
        <TableCell  align="center">
          <DeleteForeverIcon onClick={delete_trainer} /> 
        </TableCell>
      </TableRow>
      )}
    </>
  ) 
}

export function BasicTable({resultsList}) {   
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <EditIcon/>
              </TableCell>
            <TableCell align="center">Trainer Name</TableCell>  
            <TableCell align="center">Save</TableCell> 
            <TableCell align="center">-</TableCell> 
          </TableRow>
        </TableHead>
        {/* {JSON.stringify(teachersList)}
            <br/> */}
        <TableBody>
          {resultsList.map((row) => (
            <Row row={row} resultsList={resultsList}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function AddStudio(){
	const [trainerName, setTrainerName]= React.useState("")
  const [trainerId, setTrainerId]= React.useState(0)  
	
  const adminAddTrainer = function(){	
		api("/add_trainer", {name:trainerName }, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
				console.log("setTrainerId.===",backend_output )
				setTrainerId(backend_output.id)
			}
		})
	} 
	return (
		<div>
			<ResponsiveAppBar/>
      <div style={{"marginTop": "2px"}}>
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
                    <TextField fullWidth label="Trainer Name" type="text" name="name" value={trainerName} onChange={(e)=> setTrainerName(e.target.value)} />
                  </div>                
                  <div className='textal p20'>
                    <Button variant="contained" disableElevation onClick={adminAddTrainer}>
                      Add Trainer
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



export function ScheduleRow({row}) {
  const [scheduleId, setScheduleId]= React.useState(row.id)
  const [scheduleName, setScheduleName]= React.useState(row.name)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
   
  const update_schedule = function(){	
    api("/update_schedule_type", {id:scheduleId, name:scheduleName }, 
      function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{ 
        setIsUpdate(false)
        console.log("studio updated.===",backend_output )
        console.log("setIsUpdate===",isUpdate )
      }
    })
  }

  const delete_schedule = function(){	
    api("/delete_schedule_type", {id:scheduleId}, function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{
        setIsDeleted(true)
        console.log("studio updated.===",backend_output )
        console.log("setIsUpdate===",isUpdate )
      }
    })
  }

  const trainer_edit_input_on =function(){
    setIsUpdate(true)
  }


  // if (isDeleted){
  //   return <></>
  // }
  return (
    <>
    {(!isDeleted) &&(
    <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={trainer_edit_input_on} >
            edit
          </Button> 
        </TableCell>  
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <a href= {"#/manage_schedule/"+row.id}  >
              {scheduleName}
            </a>
          )}
          {isUpdate && (
            <TextField  label="Schedule Name" type="text" name="name" value={scheduleName} onChange={(e)=> setScheduleName(e.target.value)} />           
          )}
        </TableCell>
        {/* <TableCell  align="center" scope="row"> 
          {trainerId}
        </TableCell> */}
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={update_schedule} >
            Save
          </Button> 
        </TableCell>
        <TableCell  align="center">
          <DeleteForeverIcon onClick={delete_schedule} /> 
        </TableCell>
      </TableRow>
      )}
    </>
  ) 
}


export function ScheduleBasicTable({scheduleList}) {   
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <EditIcon/>
              </TableCell>
            <TableCell align="center">Schedule Type Name</TableCell>  
            <TableCell align="center">Save</TableCell> 
            <TableCell align="center">-</TableCell> 
          </TableRow>
        </TableHead>
        {/* {JSON.stringify(teachersList)}
            <br/> */}
        <TableBody>
          {scheduleList.map((row) => (
            <ScheduleRow row={row} scheduleList={scheduleList}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function AddSchedule(){
	const [scheduleTypeName, setScheduleTypeName]= React.useState("")
  const [trainerId, setTrainerId]= React.useState(0)  
	
  const adminAddschedule = function(){	
		api("/add_schedule_type", {name:scheduleTypeName }, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
				console.log("setTrainerId.===",backend_output )
				setTrainerId(backend_output.id)
			}
		})
	} 
	return (
		<div>
			<ResponsiveAppBar/>
      <div style={{"marginTop": "2px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={1} sm={1} md={3} lg={3}> 
            </Grid>
            <Grid item xs={10} sm={10} md={6} lg={6}>
                <div className='login_header2 ' style={{}}>
                  Add New schedule
                </div>
              <Item>  
              <div style={{"padding":"15px"}}>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Schedule Type " type="text" name="name" value={scheduleTypeName} onChange={(e)=> setScheduleTypeName(e.target.value)} />
                  </div>                
                  <div className='textal p20'>
                    <Button variant="contained" disableElevation onClick={adminAddschedule}>
                      Add schedule
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


function AdminTrainersAndScheduleTypePage(){
  const [resultsList, setResultsList] = React.useState([])
  const [scheduleList, setscheduleList] = React.useState([])
  
	React.useEffect(()=> {
    api("/get_all_trainers", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("/get_all_trainers=== ",backend_output.results )
        setResultsList(backend_output.results)
      } 
    })
    api("/get_all_schedule_types", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("/get_all_schedule_types”,=== ",backend_output.results )
        setscheduleList(backend_output.results)
      } 
    })
  },[])

	return (
    <>
      <div >
        <ResponsiveAppBar/>
        <div className='pl20 pt10 mt20 hsplit '>
          <div className=''> 
            <Button variant="contained" size="large" >use scroll id (Add New studio)</Button> 
          </div>
          <div className='pl20'>
            <a href={"#/admin_all_users"} style={{}}>
              <Button variant="contained" size="large" >add schedule type</Button>
            </a> 
          </div>  
        </div>
        <AddStudio/>
        <AddSchedule/>
        <div className='p2030' style={{}}>
          <div className='themecolor2 p20 fs25 bseee1'>All Trainers</div>
          <BasicTable resultsList={resultsList} />            
        </div>
        <div className='p2030' style={{}}>
          <div className='themecolor2 p20 fs25 bseee1'>All Schedule</div>
          <ScheduleBasicTable scheduleList={scheduleList} />             
        </div>
      </div>
      </>
	);
}

export default AdminTrainersAndScheduleTypePage;