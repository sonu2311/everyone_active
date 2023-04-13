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
import { useParams } from 'react-router-dom';

function StudioCheckInPage(){

  const {scheduleDate, schedule_type, studioId } = useParams()
  const [studio_checkin_list, setStudio_checkin_list]= React.useState([])
  const [scheduleTypeList, setScheduleTypeList]= React.useState([])
  const [studiosList, setStudiosList]= React.useState([])
  const [upcomeingscheduleList, setUpcomeingScheduleList]= React.useState([])
  const [daysList, setDaysList]= React.useState([]) 
  
  React.useEffect(()=> {  
    api("/get_studio_checkin_list", {"schedule_id": schedule_type}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        setStudio_checkin_list(backend_output.results)
        console.log("studio_checkin_list======  ",studio_checkin_list )
      } 
    }) 
   
  },[])

	return (
    <>
      <div >
        <ResponsiveAppBar/>
        <div className='pl20 pt10 mt20 hsplit '>
          <div className='mt20 mb20 ml20 mr20 textal'>
            <div className='bsr1' >
            studio_checkin_list = {JSON.stringify(studio_checkin_list)}
              
            </div>
          </div>   

        </div>
      </div>
      </>
	);
}

export default StudioCheckInPage;