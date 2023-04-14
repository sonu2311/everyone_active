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


function AddStudio(){
	const [studiosName, setStudiosName]= React.useState("")
  const [address, setAddress]= React.useState("")
  const [capacity, setCapacity]= React.useState("") 
  const [files, setFiles] = React.useState([])
  const [picture, setPicture]= React.useState("")
  
	
  const adminAddNewStudio = function(){	
		api("/add_studio", {name:studiosName, address:address, capacity:capacity,picture:picture }, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
				console.log("studio added.===",backend_output )
				window.location.href = "#/Admin_manage_studio"
			}
		})
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
	return (
		<div>
			<ResponsiveAppBar/>
      <div style={{}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={11} sm={11} md={7} lg={7}>
                <div className='pl40  login_header3' style={{}}>
                  Add New studio
                </div>
              <Item>  
              <div style={{"padding":"15px"}}>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Studios Name" type="text" name="name" value={studiosName} onChange={(e)=> setStudiosName(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Address" type="text" name="name" value={address} onChange={(e)=> setAddress(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Capacity" type="number" name="name" value={capacity} onChange={(e)=> setCapacity(e.target.value)} />
                  </div>
                  <div className='mt20 mb20 ml20 mr20 textal' style={{}}>
                    <input type="file"
                      onChange={(e) => uploadFile(e.target.files[0])} />
                  </div>
                  <div className='boxs imagewidth textac'>
                    {picture.length>0 &&(
                      <img style={{ width: '150px', verticalAlign: 'middle'}} 
                      src={picture} />
                    )} 
                  </div>   
                  <div className='textal mr20 ml20 mt20'>
                    <Button variant="contained" disableElevation onClick={adminAddNewStudio}>
                      Add Studio
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

export function Row({row}) {
  const [studioId, setStudiosId]= React.useState(row.id)
  const [studiosName, setStudiosName]= React.useState(row.name)
  const [address, setAddress]= React.useState(row.address || "")
  const [capacity, setCapacity]= React.useState(row.capacity) 
  const [picture, setPicture]= React.useState(row.picture)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit]= React.useState(false)
   
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
        setIsEdit(false)
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
  

  const delete_studio_in_row = () => {
    delete_studio(studioId)
    handleClose()
    setIsDeleted(true)
  };

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
    setIsEdit(true)
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
        {/* <TableCell  align="left" scope="row"> 
          <Button variant="contained" size="small" onClick={studio_edit_input_on} >
            edit
          </Button> 
        </TableCell>   */}
        <TableCell  align="left" scope="row">
          {!isUpdate && (
            <a href= {"#/Admin_manage_schedule_page/"+row.id}  >
              {studiosName}
            </a>
          )}
          {isUpdate && (
            <TextField  label="Studio Name" type="text" name="name" value={studiosName} onChange={(e)=> setStudiosName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="left" scope="row">   
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
            <img style={{ width: '50px', verticalAlign: 'middle'}} 
            src={picture} />  
          )}
          {isUpdate && (
            <div className='mt20 mb20 ml20 mr20 textac' style={{}}>
              <input type="file"
              onChange={(e) => uploadFile(e.target.files[0])} />
            </div>          
          )} 

        </TableCell>
        {!isEdit && (
          <TableCell  align="center" scope="row"> 
            <Button variant="contained" size="small" onClick={studio_edit_input_on} >
              edit
            </Button> 
          </TableCell> 
        )}
        {isEdit && ( 
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="small" onClick={update_studio} >
            Save
          </Button> 
        </TableCell>
        )}
        <TableCell  align="center">

          <Button variant="contained" size="small" onClick={handleOpen} >
            Delete
          </Button> 
          {/* <DeleteForeverIcon onClick={handleOpen} /> */}
          <div className=''>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <div className=''>
                  <Box sx={{ ...style, width: 400, "& button": { m: 10 } }} >
                    <div className='color333'>Do you really want to delete this studio ?</div> 
                      <div className='hsplit '>
                        <div className='pt10 pb10 pr20 cursor fw700'  onClick={delete_studio_in_row}    >
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


export function BasicTable({studiosList}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>     
            <TableCell align="left" style={{"fontWeight":"700"}}>Name</TableCell>
            <TableCell align="left" style={{"fontWeight":"700"}} >Address</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >capacity</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Image</TableCell> 
            <TableCell align="center" style={{"fontWeight":"700"}} >Save</TableCell> 
            <TableCell align="center">-</TableCell> 

          </TableRow>
        </TableHead>
        {/* {JSON.stringify(studiosList)}
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
        <div className='hsplit mt30 '>
          <div className='pl30'> 
            <Button variant="contained" size="large" >Add New studio</Button>  
          </div>
        </div>
        <div className='p2030 boxs' style={{}}>
          <div className='themecolor2 p20 fs25 bseee1 fontarial'>All studio</div>
          <BasicTable studiosList={studiosList} />  
        </div>
        <div className='mb50 boxs pl30 ' >
          <AddStudio/>
        </div>
      </div>
      </>
	);
}

export default AdminManageStudio;