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

export function Row({row,scheduleId}) {
  const [userId, setUserId]= React.useState(row.user_id)
  const [isCheckedIn, setIsCheckedIn]= React.useState(row.is_checked_in)
  

  // {"user_id":3,"name":"s1","is_checked_in":false},{"user_id":3,"name":"s1","is_checked_in":false}

//   # An API for checkin from the tab in studio.
// # Input: {"schedule_id": 23, "user_id": 33}
// # Sample Output: {}
// # Possible Output: {"error": "Invalid checkin"}


  const checkin =function(){
    api("/studio_checkin", {"schedule_id": scheduleId, "user_id": userId}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("/studio_checkin=== ",backend_output )
      } 
    })
  }
  return (
    <> 
      <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >    
        <TableCell  align="left" scope="row">
            <>{row.name}</>
        </TableCell>  
        <TableCell  align="center" scope="row">
          {!isCheckedIn &&(
            <Button size="small"variant="contained" disableElevation onClick={checkin}>
              check in
            </Button>
          )}
          {isCheckedIn &&(
            <Button size="small"variant="contained" disableElevation>
              Done
            </Button>
          )}

        </TableCell>
      </TableRow>
    </>
  ) 
}

export function BasicTable({studio_checkin_list, scheduleId}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500  }} >
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{"fontWeight":"700"}}>Name</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}}>-</TableCell> 
          </TableRow>
        </TableHead>
        {/* {JSON.stringify(scheduleList)} */}
        <TableBody>
          <>
          {studio_checkin_list.map((row) => (  
            <Row row={row} scheduleId={scheduleId} />
          ))}
         </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function StudioCheckInPage(){
  const {scheduleId} = useParams()
  const [studio_checkin_list, setStudio_checkin_list]= React.useState([])
  
  React.useEffect(()=> {  
    api("/get_studio_checkin_list", {"schedule_id": parseInt(scheduleId)}, function(backend_output){
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
        <div className='p20  boxs mt20 hsplit '>
          <div className='p10' style={{}}>
            <div className='p20 fs18 fw700 br2 textac bseee1 fontarial '>List Of Name</div>
            <BasicTable studio_checkin_list={studio_checkin_list} scheduleId={scheduleId}  />  
          </div>   

        </div>
      </div>
      </>
	);
}

export default StudioCheckInPage;