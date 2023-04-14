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

 export function AddSchedule({scheduleTypeList , trainerList, studioId, scheduleDate}){
	const [scheduleName, setScheduleName]= React.useState("")
  const [startTime, setStartTime]= React.useState("")
  const [endTime, setEndTime]= React.useState("") 
  const [trainerName, setTrainerName]= React.useState("")
  const [scheduleType, setScheduleType]= React.useState("")
  // const [scheduleTypeList, setScheduleTypeList]= React.useState([])
  
  const adminAddNewSchedule = function(){	
		api("/add_schedule", {name:scheduleName, start_time:startTime, end_time:endTime, schedule_date:scheduleDate, studio_id:studioId, trainer:trainerName, schedule_type:scheduleType}, 
			function(backend_output){
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{				
			}
		})
	}

	return (
		<div>
			<ResponsiveAppBar/>
      <div style={{"marginTop": "10px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={11} sm={11} md={7} lg={7}>
                <div className='pl30 login_header3' style={{}}>
                  Add New Schedule
                </div>
              <Item>  
              <div className='m20'>
                  <div className='mt20 mb20' >
                    <TextField fullWidth label="Schedule Name" type="text" name="name" value={scheduleName} onChange={(e)=> setScheduleName(e.target.value)} />
                  </div>
                  <div className='mt20 mb20'  >
                    <div className='textal' style={{"width":"100%"}} >
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Trainer Name</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={trainerName}
                          label="Trainer"
                          onChange={(e) => setTrainerName(e.target.value)}
                        >  
                          {trainerList.map((x) => (
                            <MenuItem className='answertype' value={x.name} >
                               {/* {JSON.stringify(x)} */}
                               {x.name}      
                            </MenuItem>
                          ))}                          
                        </Select>
                      </FormControl>
                    </div>  
                  </div>
                  <div className='mt20 mb20' >
                    <div className='textal' style={{"width":"100%"}} >
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Schedule Type</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={scheduleType}
                          label="Schedule Type"
                          onChange={(e) => setScheduleType(e.target.value)}
                        >  
                          {scheduleTypeList.map((x) => (
                            <MenuItem className='answertype' value={x.name} >
                               {/* {JSON.stringify(x)} */}
                              {x.name} 
                            </MenuItem>
                          ))}                          
                        </Select>
                      </FormControl>
                    </div>
                  </div>            
                  <div className='mt20 mb20 textal' style={{}}>
                    <TextField style={{"width":"100%"}}  type="time" label=" Starting Time " value= {startTime} onChange={(e)=>setStartTime(e.target.value)} /> 
                  </div>
                  <div className='mt20 mb20  textal'>
                    <TextField  style={{"width":"100%"}} type="time" label="Ending Time " value={endTime} onChange={(e)=>setEndTime(e.target.value)} />    
                  </div>   
                  <div className='textal mt20'>
                    <Button variant="contained" disableElevation onClick={adminAddNewSchedule}>
                    Add New Schedule
                    </Button>
                  </div>
                </div>  
              </Item>
            </Grid>
          </Grid>
        </Box>  
      </div>	
		</div>
	);
}

export function Row({row, scheduleTypeList, trainerList}) {
  const [id, setId]= React.useState(row.id)
  const [studioId, setStudiosId]= React.useState(row.studio_id)
  const [scheduleName, setScheduleName]= React.useState(row.name)
  const [startTime, setStartTime]= React.useState(row.start_time)
  const [endTime, setEndTime]= React.useState(row.end_time) 
  const [scheduleDate, setScheduleDate] = React.useState(row.schedule_date)
  const [trainerName, setTrainerName]= React.useState(row.trainer)
  const [scheduleType, setScheduleType]= React.useState(row.schedule_type)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit]= React.useState(false)

  
  const update_schedule = function(){	
    api("/update_schedule", {id :id, name:scheduleName, start_time:startTime, end_time:endTime, schedule_date:scheduleDate, studio_id:studioId, trainer:trainerName, schedule_type:scheduleType}, 
      function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{ 
        setIsUpdate(false)
        setIsEdit(false)
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
    delete_schedule(id)
    handleClose()
    setIsDeleted(true)
  };

  const delete_schedule = function(){	
    api("/delete_schedule", {id:id }, function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{
        setIsDeleted(true)
      }
    })
  }

  const studio_edit_input_on =function(){
    setIsUpdate(true)
    setIsEdit(true)
  }

  return (
    <>
    {(!isDeleted) &&(
    <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell  align="left" scope="row">
          {!isUpdate && (
              <>{scheduleName}</>
          )}
          {isUpdate && (
            <TextField  label="Schedule Name" type="text" name="name" value={scheduleName} onChange={(e)=> setScheduleName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="left" scope="row">
          {!isUpdate && (
            <>{trainerName}</>
          )}
          {isUpdate && (
            <div className='textal' style={{"width":"100%"}} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small">Trainer Name</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={trainerName}
                  label="Trainer"
                  onChange={(e) => setTrainerName(e.target.value)}
                >  
                  {trainerList.map((x) => (
                    <MenuItem className='answertype' value={x.name} >
                        {/* {JSON.stringify(x)} */}
                        {x.name}      
                    </MenuItem>
                  ))}                          
                </Select>
              </FormControl>
            </div>      
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <>{scheduleDate}</>
          )}
          {isUpdate && (
            <TextField style={{"width":"95%"}}  type="date" label="Schedule Date" value= {scheduleDate} onChange={(e)=>setScheduleDate(e.target.value)} />         
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              <>{startTime}</>
          )}
          {isUpdate && (
            <TextField style={{"width":"95%"}}  type="time" label=" Starting Time " value= {startTime} onChange={(e)=>setStartTime(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row"> 
          {!isUpdate && (
            <>{studioId}</>
          )}
          {isUpdate && (
            <TextField fullWidth label="Studio Id" type="number" name="name" value={studioId} onChange={(e)=> setStudiosId(e.target.value)} />         
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <>{scheduleType}</>
          )}
          {isUpdate && (
             <div className='textal' style={{"width":"100%"}} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small">Schedule Type</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={scheduleType}
                  label="Schedule Type"
                  onChange={(e) => setScheduleType(e.target.value)}
                >  
                  {scheduleTypeList.map((x) => (
                    <MenuItem className='answertype' value={x.name} >
                        {/* {JSON.stringify(x)} */}
                      {x.name} 
                    </MenuItem>
                  ))}                          
                </Select>
              </FormControl>
            </div>
          )} 
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              <>{endTime}</>
          )}
          {isUpdate && (
            <TextField  style={{"width":"95%"}} type="time" label="Ending Time " value={endTime} onChange={(e)=>setEndTime(e.target.value)} />           
          )} 
        </TableCell>
        {!isEdit && (
          <TableCell  align="left" scope="row"> 
            <Button variant="contained" size="small" onClick={studio_edit_input_on} >
              edit
            </Button> 
          </TableCell>  
        )}
        {isEdit && (
          <TableCell  align="center" scope="row"> 
            <Button variant="contained" size="small" onClick={update_schedule} >
              Save
            </Button> 
          </TableCell>
        )}
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


export function BasicTable({scheduleList, scheduleTypeList, trainerList}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{"fontWeight":"700"}}>Name</TableCell>
            <TableCell align="left" style={{"fontWeight":"700"}} >Trainer Name</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Schedule Date</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}}>Starting Time</TableCell> 
            <TableCell align="center" style={{"fontWeight":"700"}} >Studio Id</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Schedule Type</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Ending Time</TableCell>
            <TableCell align="left" style={{"fontWeight":"700"}} >Save/Edit</TableCell> 
            <TableCell align="center" style={{"fontWeight":"700"}} >-</TableCell> 

          </TableRow>
        </TableHead>
        {/* {JSON.stringify(scheduleList)} */}
        <TableBody>
          <>
          {scheduleList.map((row) => (
            <Row row={row} scheduleTypeList={scheduleTypeList} trainerList={trainerList}  />
          ))}
         </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function AdminManageSchedulePage(){
  const [scheduleList, setScheduleList]= React.useState([])
  const [studioId, setStudiosId]= React.useState(0)
  const [scheduleDate, setScheduleDate]= React.useState("")
  const [scheduleTypeList, setScheduleTypeList]= React.useState([])
  const [trainerList, setTrainerList]= React.useState([])
  const [studiosList, setStudiosList]= React.useState([])

  const scheduleDateStudioIdget_all_schedules =function(){
    setScheduleDate(scheduleDate)
    setStudiosId(studioId)
    console.log("/scheduleDateStudioIdget_all_schedules=== ",scheduleDate )
    console.log("/scheduleDateStudioIdget_all_schedules=== ",studioId )

    api("/get_all_schedules", {"schedule_date": scheduleDate, "studio_id": studioId}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("/get_all_schedules=== ",backend_output.results )
        setScheduleList(backend_output.results)
      } 
    })
  }
	
  React.useEffect(()=> {
    
    api("/get_all_schedule_types", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setScheduleTypeList(backend_output.results)
      } 
    })
    api("/get_all_trainers", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setTrainerList(backend_output.results)
      } 
    })
    api("/get_all_studios", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setStudiosList(backend_output.results)
      } 
    })

  },[])
	

	return (
    <>
      <div >
        <ResponsiveAppBar/>
        <div className='pt15 mt40 hsplit boxs '>  
          <div className='ml30 mr20  '>
            <div className='' >
              <FormControl sx={{ m: 1, minWidth: 150 }}  fullWidth >
                <InputLabel id="demo-select-small"  className=''>Studio Id</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={studioId}
                  label="Schedule Type"
                  onChange={(e) => setStudiosId(e.target.value)}
                >  
                  {studiosList.map((x) => (
                    <MenuItem className='answertype' value={x.id} >
                        {/* {JSON.stringify(x)} */}
                        {x.name},,,,,,,{x.id}
                    </MenuItem>
                  ))}                          
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='hsplit'>
            <div className='mr20 mt10' >
              <TextField label="schedule Date" type="date" color="secondary" focused value= {scheduleDate} onChange={(e)=>setScheduleDate(e.target.value)} />
            </div>
            <div className='ml20 mt12'>  
              <Button variant="contained" size="large" onClick={scheduleDateStudioIdget_all_schedules} >Show</Button>  
            </div>
          </div> 
          {/* <div className='mr20'>  
            <Button variant="contained" size="large" >Add New schedule</Button>  
          </div>          */}
        </div>
        <div className='p2030' style={{}}>
          <div className='themecolor2 p20 fs22 bseee1 fontarial'>All schedules</div>
          <BasicTable scheduleList={scheduleList} scheduleTypeList={scheduleTypeList} trainerList={trainerList} />  
        </div>

        <div className='mb50 boxs pl30 ' >
          <AddSchedule scheduleDate={scheduleDate}  studioId={studioId} scheduleTypeList={scheduleTypeList} trainerList={trainerList}/>
        </div>
      </div>
      </>
	);
}

export default AdminManageSchedulePage;