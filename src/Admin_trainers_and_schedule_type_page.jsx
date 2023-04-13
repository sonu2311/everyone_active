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
import Modal from "@mui/material/Modal";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #eee",
  boxShadow: 24,
  pt: 1,
  px: 2,
  pb: 1,
  borderRadius: 1
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export function AddTrainer(){
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
            <Grid item xs={11} sm={11} md={7} lg={7}>
                <div className='login_header2 ' style={{}}>
                  Add New Trainer
                </div>
              <Item>  
                <div style={{"margin":"20px"}}>
                  <div style={{}}>
                    <TextField fullWidth label="Trainer Name" type="text" name="name" value={trainerName} onChange={(e)=> setTrainerName(e.target.value)} />
                  </div>              
                  <div className='textal mt20'>
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



export function AddScheduleType(){
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
            <Grid item xs={11} sm={11} md={7} lg={7}>
                <div className='login_header2 ' style={{}}>
                  Add New Schedule Type
                </div>
              <Item>  
              <div className='m20' style={{}}>
                  <div style={{}}>
                    <TextField fullWidth label="Schedule Type " type="text" name="name" value={scheduleTypeName} onChange={(e)=> setScheduleTypeName(e.target.value)} />
                  </div>                
                  <div className='textal mt20'>
                    <Button variant="contained" disableElevation onClick={adminAddschedule}>
                      Add Schedule Type
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


export function Row({row}) {
  const [trainerId, setTrainerId]= React.useState(row.id)
  const [trainerName, setTrainerName]= React.useState(row.name)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
  const [open, setOpen] = React.useState(false);
   
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


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  const delete_trainer_in_row = () => {
    delete_trainer(trainerId)
    handleClose()
    setIsDeleted(true)
  };

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
        <TableCell  align="left" scope="row"> 
          <Button variant="contained" size="small" onClick={trainer_edit_input_on} >
            edit
          </Button> 
        </TableCell>  
        <TableCell  align="left" scope="row">
          {!isUpdate && (
            <>{trainerName}</>  
          )}
          {isUpdate && (
            <TextField  label="Studio Name" type="text" name="name" value={trainerName} onChange={(e)=> setTrainerName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="small" onClick={update_trainer} >
            Save
          </Button> 
        </TableCell>
        <TableCell  align="center">
          <DeleteForeverIcon onClick={handleOpen} />
          <div className=''>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <div className=''>
                <Box sx={{ ...style, width: 400, "& button": { m: 10 } }} >
                  <div className='color333'>Do you really want to delete this trainer ?</div> 
                    <div className='hsplit '>
                      <div className='pt10 pb10 pr20 cursor fw700'  onClick={delete_trainer_in_row}    >
                        Yes
                      </div>
                      <div className='pt10 pb10 pl20 cursor fw700 ' onClick={handleClose}>
                        No
                      </div>
                    </div>
                </Box>
              </div>
            </Modal>
          </div>         
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
            <TableCell align="left">
              <EditIcon/>
              </TableCell>
            <TableCell align="left" style={{"fontWeight":"700"}}>Trainer Name</TableCell>  
            <TableCell align="center" style={{"fontWeight":"700"}} >Save</TableCell> 
            <TableCell align="center" style={{"fontWeight":"700"}} >-</TableCell> 
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


export function ScheduleRow({row}) {
  const [scheduleId, setScheduleId]= React.useState(row.id)
  const [scheduleName, setScheduleName]= React.useState(row.name)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
  const [open, setOpen] = React.useState(false);
   
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  const delete_schedule_in_row = () => {
    delete_schedule(scheduleId)
    handleClose()
    setIsDeleted(true)
  };


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
        <TableCell  align="left" scope="row"> 
          <Button variant="contained" size="small" onClick={trainer_edit_input_on} >
            edit
          </Button> 
        </TableCell>  
        <TableCell  align="left" scope="row">
          {!isUpdate && (
            <a href= {"#/manage_schedule/"+row.id}  >
              {scheduleName}
            </a>
          )}
          {isUpdate && (
            <TextField  label="Schedule Name" type="text" name="name" value={scheduleName} onChange={(e)=> setScheduleName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="small" onClick={update_schedule} >
            Save
          </Button> 
        </TableCell>
        <TableCell  align="center">
          <DeleteForeverIcon onClick={handleOpen} />
          <div className=''>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <div className=''>
                <Box sx={{ ...style, width: 400, "& button": { m: 10 } }} >
                  <div className='color333'>Do you really want to delete this schedule ?</div> 
                    <div className='hsplit '>
                      <div className='pt10 pb10 pr20 cursor fw700'  onClick={delete_schedule_in_row}    >
                        Yes
                      </div>
                      <div className='pt10 pb10 pl20 cursor fw700 ' onClick={handleClose}>
                        No
                      </div>
                    </div>
                </Box>
              </div>
            </Modal>
          </div>       
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
            <TableCell align="left">
              <EditIcon/>
              </TableCell>
            <TableCell align="left" style={{"fontWeight":"700"}}>Schedule Type Name</TableCell>  
            <TableCell align="center" style={{"fontWeight":"700"}}>Save</TableCell> 
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
        <div className='mt30   hsplit '>
          <div className=' pl30'> 
            <Button variant="contained" size="large" >Add New Trainer</Button> 
          </div>
          <div className='pl30'>
            <Button variant="contained" size="large" >Add schedule type</Button>
          </div>  
        </div>
        <div className='p2030' style={{}}>
          <div className='themecolor2 p20 fs25 bseee1'>All Trainers</div>
          <BasicTable resultsList={resultsList} />            
        </div>
        <div className='p2030' style={{}}>
          <div className='themecolor2 p20 fs25 bseee1'>All Schedule Type</div>
          <ScheduleBasicTable scheduleList={scheduleList} />             
        </div>
        <div className='mb20 boxs pl30 ' >
          <AddTrainer/>
        </div>
        <div className='mb50 boxs pl30 ' >
          <AddScheduleType/>
        </div>   
      </div>
      </>
	);
}

export default AdminTrainersAndScheduleTypePage;