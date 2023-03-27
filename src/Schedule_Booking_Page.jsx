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
  const [studioId, setStudiosId]= React.useState(row.id)
  const [scheduleName, setScheduleName]= React.useState(row.name)
  const [startTime, setStartTime]= React.useState(row.start_time)
  const [endTime, setEndTime]= React.useState(row.end_time) 
  const [scheduleDate, setScheduleDate] = React.useState(row.schedule_date)
  const [trainerName, setTrainerName]= React.useState(row.trainer)
  const [scheduleType, setScheduleType]= React.useState(row.schedule_type)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
  
  const update_schedule = function(){	
    api("/update_schedule", {name:scheduleName, start_time:startTime, end_time:endTime, schedule_date:scheduleDate, studio_id:studioId, trainer:trainerName, schedule_type:scheduleType}, 
      function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{ 
        setIsUpdate(false)
      }
    })
  }

  const delete_schedule = function(){	
    api("/delete_schedule", {id:studioId }, function(backend_output){
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
  }


  return (
    <>
    {(!isDeleted) &&(
    <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={studio_edit_input_on} >
            edit
          </Button> 
        </TableCell>  
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              {scheduleName}
          )}
          {isUpdate && (
            <TextField  label="Schedule Name" type="text" name="name" value={scheduleName} onChange={(e)=> setScheduleName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            {trainerName}
          )}
          {isUpdate && (
            <TextField  label="Trainer Name" type="text" name="name" value={trainerName} onChange={(e)=> setTrainerName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            {scheduleDate}
          )}
          {isUpdate && (
            <TextField style={{"width":"95%"}}  type="datetime-local" label="Schedule Date" value= {scheduleDate} onChange={(e)=>setScheduleDate(e.target.value)} />         
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              {startTime}
          )}
          {isUpdate && (
            <TextField style={{"width":"95%"}}  type="datetime-local" label=" Starting Time " value= {startTime} onChange={(e)=>setStartTime(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row"> 
          {!isUpdate && (
            {studioId}
          )}
          {isUpdate && (
            <TextField fullWidth label="Studio Id" type="number" name="name" value={studioId} onChange={(e)=> setStudiosId(e.target.value)} />         
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            {scheduleType}
          )}
          {isUpdate && (
             <TextField fullWidth label="Schedule Type" type="text" name="name" value={scheduleType} onChange={(e)=> setScheduleType(e.target.value)} />           
          )} 
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              {endTime}
          )}
          {isUpdate && (
            <TextField  style={{"width":"95%"}} type="datetime-local" label="Ending Time " value={endTime} onChange={(e)=>setEndTime(e.target.value)} />           
          )} 
        </TableCell>
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


export function BasicTable({scheduleList}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <EditIcon/>
              </TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center" >Trainer Name</TableCell>
            <TableCell align="center" >schedule Date</TableCell>
            <TableCell align="center">Starting Time</TableCell> 
            <TableCell align="center" >studioId</TableCell>
            <TableCell align="center" >Schedule Type</TableCell>
            <TableCell align="center" >Ending Time</TableCell>
            <TableCell align="center">Save</TableCell> 
            <TableCell align="center">-</TableCell> 

          </TableRow>
        </TableHead>
        {/* {JSON.stringify(teachersList)}
            <br/> */}
        <TableBody>
          {scheduleList.map((row) => (
            <Row row={row} scheduleList={scheduleList} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function ScheduleBookingPage(){
  const [scheduleList, setScheduleList]= React.useState([])
  const [studioId, setStudiosId]= React.useState(0)
  const [scheduleDate, setScheduleDate]= React.useState("")
  const [scheduleTypeList, setScheduleTypeList]= React.useState([])
  const [trainerList, setTrainerList]= React.useState([])
  const [studiosList, setStudiosList]= React.useState([])
  const [checkboxTrueFalseList, setCheckboxTrueFalseList] = React.useState([])
  const [studio_id_list, setStudio_id_list]= React.useState([])
  const [date, setDate]= React.useState("")
  const [schedule_type, setSchedule_type]= React.useState("")
  const [upcomeingscheduleList, setUpcomeingScheduleList]= React.useState([])
  const [dateList, setDateList]= React.useState([])
	
  // # An API for getting the information of upcoming schedules for the entire week.
  // # Input: {
  // #   "studio_id_list": [2]
  // #   "date_list": ["2023-03-08", "2023-03-09"],
  // #   "schedule_type": "Yoga",
  // # }
  // # Sample Output: {"result": [
  // #  {
  // #   "date": "2023-03-08",
  // #   "schedules": [
  // #     {
  // #       "name": "Slow Yoga",
  // #       "start_time": "07:00",
  // #       "end_time": "08:00",
  // #       ...
  // #     },
  // #     {
  // #       "name": "Power Yoga",
  // #       "start_time": "09:00",
  // #       "end_time": "11:00",
  // #       ...
  // #     },
  // #     ...
  // #   ]
  // #  },
  // #  {
  // #   "date": "2023-03-09",
  // #   "schedules": [
  // #     {
  // #       "name": "Power Yoga",
  // #       "start_time": "17:00",
  // #       "end_time": "18:00",
  // #       ...
  // #     },
  // #     {
  // #       "name": "Slow Yoga",
  // #       "start_time": "19:00",
  // #       "end_time": "20:00",
  // #       ...
  // #     },
  // #     ...
  // #   ]
  // #  },
  // # ]}
  // # Possible Output: {"error": "Invalid"}

  
  React.useEffect(()=> {  
    api("/get_all_studios", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setStudiosList(backend_output.results)
        console.log("StudiosList for schedule_type======  ",studiosList )
      } 
    }) 
    api("/get_all_schedule_types", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setScheduleTypeList(backend_output.results)
        console.log("setScheduleTypeList for ======  ",scheduleTypeList )
      } 
    }) 
  },[])

  // const collect_all_studio_id = function(e){
  //   setStudiosId(e.target.value)
  //   var tmp_list = [...studio_id_list]
  //   tmp_list[0] = studioId  
  //   setStudio_id_list(tmp_list)
  //   console.log("setStudio_id_list88888888888888====",studio_id_list)
  //   console.log("setStudiosId0000000000000000000",studioId )

  // }


  const date_to_string =function(epoc_time){ 
    const Month=""+(epoc_time.getMonth()+1)
    const date=""+epoc_time.getDate()
    const Hours=""+epoc_time.getDate()
    const Minutes=""+epoc_time.getDate()
  
    const date_time = epoc_time.getFullYear()+"-"+Month.padStart(2,"0")+"-"+date.padStart(2,"0")
    return date_time
   }


  const get_upcomming_dates =function(){
   const d=new Date()
   var tmp_list = []
    for (let i = 0; i < 7; i++){
      tmp_list[i] = date_to_string(d)
      d.setDate(d.getDate()+1)
      
      console.log("tmp_list ===",studioId )
    }  
    return tmp_list
  }
 
  // d.setDate(d.getDate()+1)
  // 1679815603510
  // date_to_string(d)
  // '2023-03-26'

  const show = function(){
    api("/get_upcoming_schedules", {studio_id_list:[studioId] ,
      date_list: get_upcomming_dates(),schedule_type: schedule_type}, function(backend_output){
        if("error" in backend_output){
          alert(backend_output.error)
        }
        else{
          setUpcomeingScheduleList(backend_output.results)
        } 
      })
  }
	
	return (
    <>
      <div >
        <ResponsiveAppBar/>
        <div className='pl20 pt10 mt20 hsplit '>
          <div className='mt20 mb20 ml20 mr20 textal'>
            <div className='bsr1' >
              {/* <FormControl >
                <InputLabel id="demo-select-small">choose a studio</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={studioId}
                  label="Schedule Type"
                  onChange={(e) => setStudiosId(e.target.value)}
                >  
                  {studiosList.map((x,index) => (
                    <MenuItem className='answertype' value={x.id} >                        
                      <div> 
                        <Checkbox {...label}  
                        checked={checkboxTrueFalseList[index]||false } 
                        onChange={(e)=>OneCheckboxChange(e.target.checked, index)}/>
                        {x.name}, {x.id}
                      </div>
                    </MenuItem>
                  ))}                          
                </Select>
              </FormControl> */}
              <TextField style={{"width":"95%"}}  type="date" label="Date" value= {date} onChange={(e)=>setDate(e.target.value)} />

              {/* <Button variant="contained" size="large" onClick={datesList} >
              datesList
              </Button>  */}

              datesList==={JSON.stringify(dateList)} 

              <FormControl >
                <InputLabel id="demo-select-small">schedule_type</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={schedule_type}
                    label="schedule type"
                    onChange={(e) => setSchedule_type(e.target.value)}
                  >  
                    {scheduleTypeList.map((x) => (
                      <MenuItem className='answertype' value={x.name} >                        
                        <div> 
                          {x.name}, {x.id}
                        </div>
                      </MenuItem>
                    ))}                          
                  </Select>
              </FormControl>
              <FormControl >
                <InputLabel id="demo-select-small">Studios Id</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={studioId}
                    label="Studios Id"
                    onChange={(e) => setStudiosId(e.target.value)}
                  >  
                    {studiosList.map((x) => (
                      <MenuItem className='answertype' value={x.id} >                        
                        <div> 
                          {x.name}, {x.id}
                        </div>
                      </MenuItem>
                    ))}                          
                  </Select>
              </FormControl>
              <Button variant="contained" size="large" onClick={show} >
                Show All schedules
              </Button> 
            </div>
          </div>
          {studioId}==={studioId}
          {/* {JSON.stringify(x)} */}

          {/* {studiosList.map((x, checkboxindex)=>(
            <div> 
              <Checkbox {...label}  
              checked={checkboxAnswerList[checkboxindex]||false } 
              onChange={(e)=>OneCheckboxChange(e.target.checked, checkboxindex)}/>
              {x}
            </div>
          ))} */}
        </div>
        <div className='p2030' style={{}}>
          <div>
            upcomeingscheduleList=={JSON.stringify(upcomeingscheduleList)}
          </div> 
            <br/>
            upcomeingscheduleList=={JSON.stringify(dateList)}

          <div className='bseee1'>
            <div className='hsplit bsr1'>
              {dateList.map((x)=>(
                {x}
              ))}
              <div></div>
            </div>
          </div>  
        </div>
      </div>
      </>
	);
}

export default ScheduleBookingPage;