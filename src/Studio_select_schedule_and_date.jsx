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
import { DataArraySharp } from '@mui/icons-material';
import Modal from "@mui/material/Modal";

function StudioSelectScheduleAndDate(){
  const [studioId, setStudiosId]= React.useState(0)
  const [scheduleTypeList, setScheduleTypeList]= React.useState([])
  const [studiosList, setStudiosList]= React.useState([])
  const [schedule_type, setSchedule_type]= React.useState("")
  const [scheduleId, setScheduleId]= React.useState("")
  const [upcomeingscheduleList, setUpcomeingScheduleList]= React.useState([])
  const [daysList, setDaysList]= React.useState([]) 
  const [scheduleDate, setScheduleDate]= React.useState("")
  
  React.useEffect(()=> {  
    api("/get_all_studios", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setStudiosList(backend_output.results)
        console.log("StudiosList 555555555555======  ",studiosList )
      } 
    }) 
    api("/get_all_schedules", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setScheduleTypeList(backend_output.results)
        console.log("setScheduleTypeList for7777777777777777 ======  ",scheduleTypeList )
      } 
    }) 
  },[])



  const show_all_details_in_next_tab = function(){
    window.location.href = "#/Studio_check_in_page"+"/" +scheduleDate+"/"+schedule_type+"/"+studioId
  }

	return (
    <>
      <div >
        <ResponsiveAppBar/>
        <div className='pl20 pt10 mt20 hsplit '>
          <div className='mt20 mb20 ml20 mr20 textal'>
            <div className='bsr1' >
            
            <TextField style={{"width":"95%"}}  type="date" label="Schedule Date" value= {scheduleDate} onChange={(e)=>setScheduleDate(e.target.value)} />         
          
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
                      <MenuItem className='answertype' value={x.id} >                        
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
              <Button variant="contained" size="large" onClick={show_all_details_in_next_tab}  >
                Show All schedules
              </Button> 
            </div>
          </div>

          daysList = {JSON.stringify(daysList)}

        </div>
      </div>
      </>
	);
}

export default StudioSelectScheduleAndDate;