import {ResponsiveAppBar} from './header'
import React from 'react';
import {api} from './library';
import './main.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
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


function AddMembershipPlans(){
	const [planName, setPlanName]= React.useState("")
  const [description, setDescription]= React.useState("")
  const [price, setPrice]= React.useState(0)
  const [picture, setPicture]= React.useState("")
  const [expiry_duration, setExpiry_duration] = React.useState(0)
  const [files, setFiles] = React.useState([])
  const [paymentFrequency, setPaymentFrequency]= React.useState("")
  const [expiryDurationUnit, setExpiryDurationUnit]= React.useState("")

	const adminAddNewMembershipPlans = function(){	
		api("/add_membership_plan", {name: planName, price:price, terms_and_conditions:description, payment_frequency:paymentFrequency, expiry_duration_unit: expiryDurationUnit, expiry_duration:expiry_duration  }, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
				console.log("membership_plan")
				
			}
		})
	}

  const scroll = function(){

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
                <div className='pl30 login_header5' style={{}}>
                  Add New Membership Plan
                </div>                            
              <Item>  
                <div className='' style={{}}>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Plan Name" type="text" name="name" value={planName} onChange={(e)=> setPlanName(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Price" type="number" name="name" value={price} onChange={(e)=> setPrice(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField  fullWidth label="Expiry Duration" type="number" name="name" value={expiry_duration} onChange={(e)=> setExpiry_duration(e.target.value)} />
                  </div>
                  <div className='' style={{"margin":"20px"}}>
                    <div className='textal' style={{"width":"100%"}}>
                      <FormControl  fullWidth>
                          <InputLabel id="demo-select-small">Expiry Duration Unit</InputLabel>
                          <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={expiryDurationUnit}
                            label="Expiry Duration Unit"
                            onChange={(e) => setExpiryDurationUnit(e.target.value)}
                          >
                            <MenuItem className='answertype' value={"DAYS"} >{"DAYS"}</MenuItem>
                            <MenuItem className='answertype' value={"MONTHS"} >{"MONTHS"}</MenuItem>
                            <MenuItem className='answertype' value={"YEARS"} >{"YEARS"}</MenuItem>
                          </Select>
                      </FormControl>
                    </div>
                  </div>
									<div style={{"margin":"20px"}}>
                    <TextField
                      fullWidth
                      id="outlined-multiline-flexible"
                      label="Terms"
                      multiline
                      maxRows={4}
                      value={description} onChange={(e)=>setDescription(e.target.value)}
                    />
                  </div>
                  <div className=' boxs mb10 m20 textal' >
                    <div className='textal' style={{"width":"100%"}} >
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Payment Frequency</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={paymentFrequency}
                          label="Payment Frequency"
                          onChange={(e) => setPaymentFrequency(e.target.value)}
                        >
                          <MenuItem className='answertype' value={"FREE"} >{"FREE"}</MenuItem>
                          <MenuItem className='answertype' value={"ONE_TIME"} >{"ONE_TIME"}</MenuItem>
                          <MenuItem className='answertype' value={"MONTHLY"} >{"MONTHLY"}</MenuItem>
                          <MenuItem className='answertype' value={"YEARLY"} >{"YEARLY"}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {/* <div>         
                    <div>
                      <img style={{ width: '150px', verticalAlign: 'middle'}} 
                      src={picture} />
                    </div>              
                  
                    <div className='mt20 mb20 ml20 mr20 textal' style={{}}>
                      <input type="file"
                        onChange={(e) => uploadFile(e.target.files[0])} />
                    </div>          
                  </div> */}
                  <div className='textal ml20 mr20 mb20'>
                    <Button variant="contained" disableElevation onClick={adminAddNewMembershipPlans}>
                      Add Membership Plans
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
  const [id, setId]= React.useState(row.id)
  const [planName, setPlanName]= React.useState(row.name)
  const [description, setDescription]= React.useState(row.terms_and_conditions)
  const [price, setPrice]= React.useState(row.price)
  const [picture, setPicture]= React.useState(row.picture)
  const [expiry_duration, setExpiry_duration] = React.useState(row.expiry_duration)
  const [files, setFiles] = React.useState([])
  const [paymentFrequency, setPaymentFrequency]= React.useState(row.payment_frequency)
  const [expiryDurationUnit, setExpiryDurationUnit]= React.useState(row.expiry_duration_unit)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit]= React.useState(false)

  
  const update_membership_plan = function(){	
    api("/update_membership_plan", {id:id, name: planName, price:price, terms_and_conditions:description, payment_frequency:paymentFrequency, expiry_duration_unit: expiryDurationUnit, expiry_duration : expiry_duration }, 
      function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{ 
        setIsUpdate(false)
        setIsEdit(false)
        console.log("membership_plan===",backend_output )
      }
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  const delete_membership_plan_in_row = () => {
    delete_membership_plan(id)
    handleClose()
    setIsDeleted(true)
  };


   const delete_membership_plan = function(){	
    api("/delete_membership_plan", {id:id }, function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{
        setIsDeleted(true)
        console.log("membership_plan deleted===",backend_output )
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


  return (
    <>
    {(!isDeleted) &&(
    <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        
        <TableCell  align="left" scope="row">
          {!isUpdate && (
              <>{planName}</>
          )}
          {isUpdate && (
            <TextField  label="Plan Name" type="text" name="name" value={planName} onChange={(e)=> setPlanName(e.target.value)} />           
          )}
        </TableCell>
        <TableCell  align="left" scope="row"> 
          {!isUpdate && (
            <>{price}</>
          )}
          {isUpdate && (
            <TextField fullWidth label="Price" type="number" name="name" value={price} onChange={(e)=> setPrice(e.target.value)} />         
          )}
        </TableCell>

        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <>{description}</>
          )}
          {isUpdate && (
            <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Terms"
            multiline
            maxRows={4}
            value={description} onChange={(e)=>setDescription(e.target.value)}
          />          
          )}
        </TableCell>
         <TableCell  align="center" scope="row">
          {!isUpdate && (
            <>{expiry_duration}</>
          )}
          {isUpdate && (
            <TextField  fullWidth label="Expiry Duration" type="number" name="name" value={expiry_duration} onChange={(e)=> setExpiry_duration(e.target.value)} />
            
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              <>{paymentFrequency}</>
          )}
          {isUpdate && (
            <FormControl sx={{  minWidth: 200 }}  size="small">
              <InputLabel id="demo-select-small">Payment Frequency</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={paymentFrequency}
                label="Payment Frequency"
                onChange={(e) => setPaymentFrequency(e.target.value)}
              >
                <MenuItem className='answertype' value={"FREE"} >{"FREE"}</MenuItem>
                <MenuItem className='answertype' value={"ONE_TIME"} >{"ONE_TIME"}</MenuItem>
                <MenuItem className='answertype' value={"MONTHLY"} >{"MONTHLY"}</MenuItem>
                <MenuItem className='answertype' value={"YEARLY"} >{"YEARLY"}</MenuItem>
              </Select>
            </FormControl>          
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <>{expiryDurationUnit}</>
          )}
          {isUpdate && (
            <>
            <FormControl  fullWidth>
              <InputLabel id="demo-select-small">Expiry Duration Unit</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={expiryDurationUnit}
                  label="Expiry Duration Unit"
                  onChange={(e) => setExpiryDurationUnit(e.target.value)}
                >
                  <MenuItem className='answertype' value={"DAYS"} >{"DAYS"}</MenuItem>
                  <MenuItem className='answertype' value={"MONTHS"} >{"MONTHS"}</MenuItem>
                  <MenuItem className='answertype' value={"YEARS"} >{"YEARS"}</MenuItem>
                </Select>
            </FormControl>
            </>          
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
            <Button variant="contained" size="small" onClick={update_membership_plan} >
              Save
            </Button> 
          </TableCell>
        )} 
        <TableCell  align="center">
          <Button variant="contained" size="small" onClick={handleOpen} >
            Delete
          </Button> 
          <div className=''>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <div className=''>
                <Box sx={{ ...style, width: 400, "& button": { m: 10 } }} >
                  <div className='color333'>Do you really want to delete this membership plan ?</div> 
                    <div className='hsplit '>
                      <div className='pt10 pb10 pr20 cursor fw700'  onClick={delete_membership_plan_in_row}    >
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


export function BasicTable({membershipPlansList}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{"fontWeight":"700"}}>Plan Name</TableCell>
            <TableCell align="left" style={{"fontWeight":"700"}} >Price</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}}  >Terms And Conditions</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}}>Expiry Duration</TableCell> 
            <TableCell align="center" style={{"fontWeight":"700"}} >Payment Frequency</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Expiry Duration Unit</TableCell>
            <TableCell align="center" style={{"fontWeight":"700"}} >Save</TableCell> 
            <TableCell align="center" >-</TableCell> 
          </TableRow>
        </TableHead>
        {/* membershipPlansList=== {JSON.stringify(membershipPlansList)} */}
        <TableBody>
          {membershipPlansList.map((row) => (
            <Row row={row} membershipPlansList={membershipPlansList}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function AdminManageMemberships(){
  const [membershipPlansList, setMembershipPlansList]= React.useState([])
  

	React.useEffect(()=> {
    api("/get_all_membership_plans", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("admin_get_all_teachers=== ",backend_output )
        setMembershipPlansList(backend_output.results)
      } 
    })
    
  },[])
	return (
    <>
      <div >
        <ResponsiveAppBar/>
        
        <div className='p2030 boxs mt30' style={{}}>
          <div className='themecolor2 p20 fs22 bseee1 fontarial'>All Membership Plans</div>
          <BasicTable membershipPlansList={membershipPlansList} />  
        </div>
        <div className='mb50 boxs pl30 ' >
          <AddMembershipPlans/>
        </div>
      </div>
      </>
	);
}

export default AdminManageMemberships;