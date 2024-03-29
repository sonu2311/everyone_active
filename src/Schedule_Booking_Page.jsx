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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DataArraySharp } from '@mui/icons-material';
import Modal from "@mui/material/Modal";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #eee",
  boxShadow: 24,
  pt: 1,
  px: 2,
  pb: 0,
  borderRadius :1
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function OneSchedulesDetails({schedulesDetails}) {
  const [scheduleId, setScheduleId]= React.useState(schedulesDetails.id)
  const [name, setname]= React.useState(schedulesDetails.name)
  const [start_time, setstart_time]= React.useState(schedulesDetails.start_time)
  const [end_time, setend_time]= React.useState(schedulesDetails.end_time)
  const [trainer, setrainer]= React.useState(schedulesDetails.trainer) 
  const [schedule_type, setschedule_type] = React.useState(schedulesDetails.schedule_type);
  const [num_bookings, setnum_bookings] = React.useState(schedulesDetails.num_bookings);
  const [capacity, setcapacity] = React.useState(schedulesDetails.capacity);
  const [address, setaddress] = React.useState(schedulesDetails.address);
  const [studio_name, setstudio_name] = React.useState(schedulesDetails.studio_name);
  const [list, setList]= React.useState(schedulesDetails)
  const [open, setOpen] = React.useState(false);
  const [isReserved, setIsReserved] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const booking_Reserve= function(scheduleId){
    api("/book_schedule", {"schedule_id": scheduleId}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error + " You don't have a membership plan. You need to get the membership first")
      }
      else{
        console.log("/book_schedule=== ",backend_output )
        alert("booking is confirmed.")
      } 
    })
  }

  const reserve = () => {
    booking_Reserve(scheduleId)
    handleClose()
    setIsReserved(true)
  };
  

  const booking_cancel= function(scheduleId){
    api("/cancel_booking", {"schedule_id": scheduleId}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("/booking_cancel=== ",backend_output )
        alert("booking is canceled.")
      } 
    })
  }

  const cancel = () => {
    booking_cancel(scheduleId)
    handleClose()
    setIsReserved(false)
  };

  
  return ( 
     <>  
        <div className='p20 boderbottomeee'> 
          <p>Name: {name}</p> 
          <p>Id:  {scheduleId}</p>
          <p>Start Time: {start_time}</p>
          <p>End Time: {end_time}</p>
          <p>Trainer: {trainer}</p>         
          <div>
            {!isReserved && (  
              <div style={{cursor:"pointer" }} >
                <Button variant="outlined" size="small" onClick={handleOpen} >Reserve</Button>
              </div>
            )}
            {isReserved && (  
              <div style={{cursor:"pointer" }} >
                <Button size="small" variant="text" onClick={handleOpen} >Cancel</Button>
              </div>
            )}
            <div >
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <div className='' >
                  <Box sx={{ ...style, width: 350, "& button": { m: 5 } }} >
                    <div >
                      <p>Studio Name : {studio_name}</p>
                      <p>Schedule Type : {schedule_type}</p>
                      <p>Num Bookings : {num_bookings}</p>
                      <p>Capacity : {num_bookings} out of {capacity} slots available</p>
                      <p>Address : {address}</p>  
                    </div>
                    <hr/> 
                  <div className='color333 fw700'>Do you really want to Reserve ?</div> 
                    <div className='hsplit boxs'>
                      {!isReserved && ( 
                        <div className='mt10 '>
                          <Button className='bseee1 ' variant="contained" style={{"margin":"1px"}} onClick={reserve}  >Yes</Button>
                        </div>    
                      )}
                      {isReserved && ( 
                        <div className='mt10 '>
                          <Button className='bseee1 ' variant="outlined" style={{"margin":"1px"}} onClick={cancel}   >Cancel</Button>
                        </div>  
                      )}
                       <div className='m10 '>
                          <Button className='bseee1  ' variant="outlined" style={{"margin":"1px"}} onClick={handleClose} > No</Button>
                        </div>  
                    </div>
                  </Box>
                </div>
              </Modal>
            </div>  
          </div>  
        </div>  
       
     </>
  );
}
                 
export function SchedulesDetails({row}) {
  const [scheduleId, setScheduleId]= React.useState(row.id)
  const [scheduleDictionary, setScheduleDictionary]= React.useState(row)
  const [open, setOpen] = React.useState(false);
  return ( 
     <> 
      <>{scheduleDictionary.map((x, index) => (                                           
          <div className=''>
            <OneSchedulesDetails key={x.id} schedulesDetails={x} />    
          </div>       
        ))}
        </>
     </>
  );
}

const date_to_string =function(epoc_time){ 
  const Month=""+(epoc_time.getMonth()+1)
  const date=""+epoc_time.getDate()
  const Hours=""+epoc_time.getDate()
  const Minutes=""+epoc_time.getDate()

  const date_time = epoc_time.getFullYear()+"-"+Month.padStart(2,"0")+"-"+date.padStart(2,"0")
  return date_time
 }

 const get_upcomming_days =function(){
  const d=new Date()
  var tmp_list = []
  var tmp_list2 =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
   for (let i = 0; i < 7; i++){
    tmp_list[i]=tmp_list2[d.getDay()]  
     d.setDate(d.getDate()+1)
     console.log("tmp_list ===", tmp_list)
   }  
   return tmp_list
 }

const get_upcomming_dates1 =function(p){
  const d=new Date()
  d.setDate(d.getDate()+p)
  var tmp_list = []
   for (let i = 0; i < 7; i++){
     tmp_list[i] = date_to_string(d)
     d.setDate(d.getDate()+1)
     console.log("tmp_list ===", tmp_list)
   }  
   return tmp_list
 }

function ScheduleBookingPage(){
  const [studioId, setStudiosId]= React.useState(0)
  const [scheduleTypeList, setScheduleTypeList]= React.useState([])
  const [studiosList, setStudiosList]= React.useState([])
  const [schedule_type, setSchedule_type]= React.useState("")
  const [upcomeingscheduleList, setUpcomeingScheduleList]= React.useState([])
  const [daysList, setDaysList]= React.useState(get_upcomming_days())
  const [isDivShow, setIsDivShow]= React.useState(false)
  const counter= React.useRef(0)
  const upcommingDaysList= React.useRef(get_upcomming_dates1(0))
  
	
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

 
  const previous = function(){    
    counter.current=counter.current-7
    upcommingDaysList.current= get_upcomming_dates1(counter.current) 
    show () 
  }

  const next = function(){
    counter.current=counter.current+7
    upcommingDaysList.current= get_upcomming_dates1(counter.current)
    show ()
  }

  
  const show = function(){
    api("/get_upcoming_schedules", {studio_id_list:[studioId] ,
      date_list: upcommingDaysList.current, schedule_type: schedule_type}, function(backend_output){
        if("error" in backend_output){
          alert(backend_output.error)
        }
        else{
          setUpcomeingScheduleList(backend_output.results)     
          setIsDivShow(true)
        } 
      })
  }
	
	return (
    <>
      <div >
        <ResponsiveAppBar/>
        <div style={{}}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container >
              <Grid item  md={1} lg={1}> 
              </Grid>
              <Grid item xs={12} sm={12} md={10} lg={10}>        
                <div className=' boxs ' style={{}}>       
                  <div className='mt40 mb20 pt10  textal'>
                    <div className='login_header5 pl20 ml10 mr10 br2 mb20 fs22 fontarial' style={{}}>
                      All Booking
                    </div>
                    <div className='hsplit' >
                      <div className=' mr10'>
                        <FormControl sx={{ m: 1, minWidth: 180 }}  size="small">
                          <InputLabel id="demo-select-small">Schedule Type</InputLabel>
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
                      </div>
                      <div className=' mr10 '>
                        <FormControl sx={{ m: 1, minWidth: 180 }}  size="small" >
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
                      </div>
                      <div className='mt10 ml10 '>
                        <Button variant="contained" size="small" onClick={show} >
                          Show
                        </Button> 
                      </div>
                      {/* <p>counter.current={counter.current}</p>

                      <p>upcommingDaysList={JSON.stringify(upcommingDaysList.current)}</p> */}
                    </div>
                  </div>
                  <div className='p20' style={{overflowX:"auto"}}>
                    {/* <div>
                      upcomeingscheduleList=={JSON.stringify(upcomeingscheduleList)}
                    </div>  */}
                    {isDivShow && (
                      <div className='card boxs' style={{"width":"1515px"}}>
                        <div className='mb20 boxs' style={{}}>
                         <span className='mr20'>
                            <Button variant="outlined" onClick={previous} startIcon={<SkipPreviousIcon />}>previous</Button>
                          </span>
                          <Button variant="outlined" onClick={next} endIcon={<SkipNextIcon />}>next</Button>
                        </div>
                        <div className='hsplit'>
                          {upcomeingscheduleList.map((x, index)=>(
                            <>
                            <div className='bseee1 boxs'style={{}}  >
                            
                              <div className='pl10 pt10 pb10 boxs bckgr colorfff themecolor1 fontarial
                              'style={{"width":"210px"}}>       
                                <div>{daysList[index]}</div>
                                <div className='pt2'>{x.date}</div>
                              </div>
                              <div className='' style={{"width":"210px"}} >
                              {x.schedules.length > 0 &&(
                                <SchedulesDetails  row={x.schedules} />
                              )}  
                              </div>
                            </div>  
                            </>
                          ))}
                        </div>
                      </div>

                    )}
                  </div>
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

export default ScheduleBookingPage;