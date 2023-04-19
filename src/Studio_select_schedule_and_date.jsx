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


export function Row({row, scheduleTypeList}) {
  const [id, setId]= React.useState(row.id)
  const [studioId, setStudiosId]= React.useState(row.studio_id)
  const [scheduleName, setScheduleName]= React.useState(row.name)
  const [startTime, setStartTime]= React.useState(row.start_time)
  const [endTime, setEndTime]= React.useState(row.end_time) 
  const [scheduleDate, setScheduleDate] = React.useState(row.schedule_date)
  const [trainerName, setTrainerName]= React.useState(row.trainer)
  const [scheduleType, setScheduleType]= React.useState(row.schedule_type)
  const [scheduleId, setScheduleId]= React.useState(row.id)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit]= React.useState(false)

  
  return (
    <> 
      <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell  align="left" scope="row">
          <a href={"#/Studio_check_in_page"+"/"+scheduleDate+"/"+scheduleId+"/"+studioId}>  
            {scheduleType}
          </a>
        </TableCell>

        <TableCell  align="left" scope="row"> 
          <a href={"#/Studio_check_in_page"+"/"+scheduleDate+"/"+scheduleId+"/"+studioId}>       
            {scheduleName}
          </a>
        </TableCell>
        <TableCell  align="center" scope="row">
          {trainerName}
          row==={JSON.stringify(row)}  
        </TableCell>
        <TableCell  align="center" scope="row">
            <>{scheduleDate}</>
        </TableCell>
        
        {/* <TableCell  align="center" scope="row"> 
          {studioId}
        </TableCell> */}
        
        <TableCell  align="center" scope="row">
          {startTime}
        </TableCell>
        <TableCell  align="center" scope="row">
          {endTime}
        </TableCell>
      </TableRow>
    </>
  ) 
}

export function BasicTable({scheduleList, scheduleTypeList, trainerList}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{"fontWeight":"700"}} >Schedule Type</TableCell>
            <TableCell align="left" style={{"fontWeight":"700"}}>Name</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Trainer Name</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Schedule Date</TableCell>    
            {/* <TableCell align="center" style={{"fontWeight":"700"}} >Studio Id</TableCell> */}
            <TableCell align="center" style={{"fontWeight":"700"}}>Starting Time</TableCell> 
            <TableCell align="center" style={{"fontWeight":"700"}} >Ending Time</TableCell>
          </TableRow>
        </TableHead>
        {/* {JSON.stringify(scheduleList)} */}
        <TableBody>
          <>
          {scheduleList.map((row) => (  
            <Row row={row} scheduleTypeList={scheduleTypeList} />
          ))}
         </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export function Card({row}) {
  const [id, setId]= React.useState(row.id)
  const [studioId, setStudiosId]= React.useState(row.studio_id)
  const [scheduleName, setScheduleName]= React.useState(row.name)
  const [startTime, setStartTime]= React.useState(row.start_time)
  const [endTime, setEndTime]= React.useState(row.end_time) 
  const [scheduleDate, setScheduleDate] = React.useState(row.schedule_date)
  const [trainerName, setTrainerName]= React.useState(row.trainer)
  const [scheduleType, setScheduleType]= React.useState(row.schedule_type)
  const [scheduleId, setScheduleId]= React.useState(row.id)
  
  return (
    <>   
      <a href={"#/Studio_check_in_page"+"/"+scheduleDate+"/"+scheduleId+"/"+studioId}>   
        <div className='card'> 
          <div className='textal' style={{}}>
            <p className='textal'>
            Schedule Name : {scheduleName}
            </p>
            <p className='textal'>
            Trainer Name : {trainerName}
            </p>
            <p className='textal'>
            Schedule Type :{scheduleType}   
            </p>
            <p className='textal'>
            Schedule Date : {scheduleDate}
            </p>
            <p className='textal'>
            Start Time : {startTime}
            </p>
            <p className=' textal'>
            End Time : {endTime}
            </p>
          </div>
        </div> 
      </a>
    </>
  ) 
}


function StudioSelectScheduleAndDate(){
  const [studioId, setStudiosId]= React.useState(0)
  const [scheduleList, setScheduleList]= React.useState([])
  const [studiosList, setStudiosList]= React.useState([])
  const [scheduleId, setScheduleId]= React.useState("")
  const [schedule_type, setSchedule_type]= React.useState("")
  const [isDivShow, setIsDivShow]= React.useState(false) 
  const [scheduleTypeList, setScheduleTypeList]= React.useState([])
  const [studio_checkin_list, setStudio_checkin_list]= React.useState([])
  const [scheduleDate, setScheduleDate]= React.useState("")

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
        setIsDivShow(false)
      } 
    })
  }
  
  React.useEffect(()=> {   
    api("/get_all_studios", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setStudiosList(backend_output.results)
        setIsDivShow(true)
      } 
    })
  },[])

	return (
    <>
      <ResponsiveAppBar/>    
      <div>
        <div style={{}}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container >
              <Grid item  md={1} lg={1}> 
              </Grid>
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <div className='mt40 mb20 pt10 pl20 boxs'>
                  <div className='hsplit' >
                    <div className='mr10 mb10'>
                      <TextField label="schedule Date" type="date" color="secondary" focused value= {scheduleDate} onChange={(e)=>setScheduleDate(e.target.value)} />
                    </div>
                    <div className=''>
                      <FormControl sx={{ minWidth: 180 }} fullwidht >
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
                                  {x.name}
                                </div>
                              </MenuItem>
                            ))}                          
                          </Select>
                      </FormControl>
                    </div>
                    <div className='mt20 ml10 '>
                      <Button variant="contained" size="small" onClick={scheduleDateStudioIdget_all_schedules} >
                        Show
                      </Button> 
                    </div>
                  </div>
                </div>
                {scheduleList.length>0 && (
                  <div className=' themecolor2 textal pl20 ml20 mr20 br2 fs25 fontarial' style={{}}>
                    All schedules
                  </div>
                )}
                {/* {isDivShow && (
                  <div className='mt70'>
                    <div className='   textac fs18 pt70 fontarial'>Select Schedule Date  And Studio For All Schedule For Date. </div>
                  </div>
                )} */}


                <div className=' boxs' style={{}}>     
                  <Grid container >
                    {scheduleList.map((row)=>( 
                      <Grid xs={12} sm={12} md={3} lg={3}> 
                        <div className='p2030' style={{}}>
                          <Card row={row} scheduleTypeList={scheduleTypeList} />
                        </div>
                      </Grid>  
                    ))}
                  </Grid>
                </div>
              </Grid>
              <Grid item  md={1} lg={1}>
              </Grid>
            </Grid>
          </Box>    
        </div>	
		</div>
    </>
	);
}

export default StudioSelectScheduleAndDate;