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
  const [studiosName, setStudiosName]= React.useState(row.name)
  const [address, setAddress]= React.useState(row.address || "")
  const [capacity, setCapacity]= React.useState(row.capacity) 
  const [picture, setPicture]= React.useState(row.picture)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
   
  console.log("address=============", address)
  const update_studio = function(){	
    api("/update_studio", {id:studioId, name:studiosName, address:address, capacity:capacity, picture:picture }, 
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

  const delete_studio = function(){	
    api("/delete_studio", {id:studioId }, function(backend_output){
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

  const studio_edit_input_on =function(){
    setIsUpdate(true)
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
          setPicture(backend_output.uploaded_filename)
        });
    }
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
          <Button variant="contained" size="large" onClick={studio_edit_input_on} >
            edit
          </Button> 
        </TableCell>  
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <a href= {"#/manage_schedule/"+row.id}  >
              {studiosName}
            </a>
          )}
          {isUpdate && (
            <TextField  label="Studio Name" type="text" name="name" value={studiosName} onChange={(e)=> setStudiosName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row">   
           {/* // JSON.stringify(address) */}
          {!isUpdate && (  
            <>{address}</>
          )}
         
          {isUpdate && (
            <TextField  label="Address" type="text" name="name" value={address} onChange={(e)=> setAddress(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          
          {!isUpdate && (
            <a href= {"#/manage_schedule/"+row.id}  >
              {capacity}
            </a>
          )}
          {isUpdate && (
            <TextField  label="capacity" type="number" name="name" value={capacity} onChange={(e)=> setCapacity(e.target.value)} />           
          )} 
        </TableCell>
        <TableCell  align="center">
          {!isUpdate && (  
            <img style={{ width: '150px', verticalAlign: 'middle'}} 
            src={picture} />  
          )}
          {isUpdate && (
            <div className='mt20 mb20 ml20 mr20 textal' style={{}}>
              <input type="file"
              onChange={(e) => uploadFile(e.target.files[0])} />
            </div>          
          )} 

        </TableCell>
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={update_studio} >
            Save
          </Button> 
        </TableCell>
        <TableCell  align="center">
          <DeleteForeverIcon onClick={delete_studio} /> 
        </TableCell>
      </TableRow>
      )}
    </>
  ) 

}


export function BasicTable({studiosList}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <EditIcon/>
              </TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center" >Address</TableCell>
            <TableCell align="center" >capacity</TableCell>
            <TableCell align="center">Image</TableCell> 
            <TableCell align="center">Save</TableCell> 
            <TableCell align="center">-</TableCell> 

          </TableRow>
        </TableHead>
        {/* {JSON.stringify(teachersList)}
            <br/> */}
        <TableBody>
          {studiosList.map((row) => (
            <Row row={row} studiosList={studiosList}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function AdminManageStudio(){
  const [studiosList, setStudiosList]= React.useState([])
  const [files, setFiles] = React.useState([])
  
	React.useEffect(()=> {
    api("/get_all_studios", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("/get_all_studios=== ",backend_output.results )
        setStudiosList(backend_output.results)
      } 
    })
  },[])

	return (
    <>
      <div >
        <ResponsiveAppBar/>
        <div className='pl20 pt10 mt20 hsplit '>
          <div className=''>
            <a href={"#/add_studio" } style={{}}>
            <Button variant="contained" size="large" >Add New studio</Button>
            </a>
          </div>
          <div className='pl20'>
            <a href={"#/admin_all_users"} style={{}}>
              <Button variant="contained" size="large" >All users</Button>
            </a> 
          </div>
        </div>
        <div className='p2030' style={{}}>
          <div className='themecolor2 p20 fs25 bseee1'>All studio</div>
          <BasicTable studiosList={studiosList} />
          
        </div>
      </div>
      </>
	);
}

export default AdminManageStudio;