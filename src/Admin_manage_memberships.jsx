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
 
//   # An API for admin to add a new membership_plan.
// #
// # Sample input: {"name": "Monthly Plan", "price": 3939, "terms_and_conditions": "..",
// #                "payment_frequency": "MONTHLY", "expiry_duration": 5,
// #                "expiry_duration_unit": "MONTH"}
// #
// # @payment_frequency could be [FREE, ONE_TIME, MONTHLY, YEARLY]
// # @expiry_duration_unit could be [DAYS, MONTHS, YEARS]
// #
// # Output: {"id": 44}

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
      <div style={{"marginTop": "100px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={1} sm={1} md={3} lg={3}> 
            </Grid>
            <Grid item xs={10} sm={10} md={6} lg={6}>
                <div className='login_header' style={{}}>
                  Add Membership Plan
                </div>
               
                
              <Item>  
                <div style={{"padding":"15px"}}>
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
                  <div className='mt20 mb20 ml20 mr20 textal' style={{}}>
                    <input type="file"
                      onChange={(e) => uploadFile(e.target.files[0])} />
                  </div> 
                  <div>
                    <img style={{ width: '150px', verticalAlign: 'middle'}} 
                    src={picture} />
                  </div> 
                  <div className='textal p20'>
                    <Button variant="contained" disableElevation onClick={adminAddNewMembershipPlans}>
                      Add Membership Plans
                    </Button>
                  </div>
                </div>  
              </Item>
            </Grid>
            <Grid item xs={1}  sm={1} md={3} lg={3}>
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
  const [description, setDescription]= React.useState(row.description)
  const [price, setPrice]= React.useState(row.price)
  const [picture, setPicture]= React.useState(row.picture)
  const [expiry_duration, setExpiry_duration] = React.useState(row.expiry_duration)
  const [files, setFiles] = React.useState([])
  const [paymentFrequency, setPaymentFrequency]= React.useState(row.paymentFrequency)
  const [expiryDurationUnit, setExpiryDurationUnit]= React.useState(row.expiryDurationUnit)
  const [isUpdate, setIsUpdate]= React.useState(false)
  const [isDeleted, setIsDeleted]= React.useState(false)

  
  const update_membership_plan = function(){	
    api("/update_membership_plan", {name: planName, price:price, terms_and_conditions:description, payment_frequency:paymentFrequency, expiry_duration_unit: expiryDurationUnit, expiry_duration : expiry_duration }, 
      function(backend_output){
      console.log("backend_output=",backend_output )
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{ 
        setIsUpdate(false)
        console.log("membership_plan===",backend_output )
      }
    })
  }

  const delete_schedule = function(){	
    api("/delete_schedule", {id:id }, function(backend_output){
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
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={studio_edit_input_on} >
            edit
          </Button> 
        </TableCell>  
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              <>{planName}</>
          )}
          {isUpdate && (
            <TextField  label="Plan Name" type="text" name="name" value={planName} onChange={(e)=> setPlanName(e.target.value)} />           
          )}
        </TableCell>
        {/* <TableCell  align="center" scope="row">
          {!isUpdate && (
            {description}
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
        </TableCell> */}
        {/* <TableCell  align="center" scope="row">
          {!isUpdate && (
            {expiry_duration}
          )}
          {isUpdate && (
            <TextField  fullWidth label="Expiry Duration" type="datetime-local" name="name" value={expiry_duration} onChange={(e)=> setExpiry_duration(e.target.value)} />      
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
              {paymentFrequency}
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
            {price}
          )}
          {isUpdate && (
            <TextField fullWidth label="Price" type="number" name="name" value={price} onChange={(e)=> setPrice(e.target.value)} />         
          )}
        </TableCell>
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            {expiryDurationUnit}
          )}
          {isUpdate && (
            <TextField fullWidth label="Expiry Duration Unit" type="text" name="name" value={expiryDurationUnit} onChange={(e)=> setExpiryDurationUnit(e.target.value)} />           
          )} 
        </TableCell>
       
        <TableCell  align="center" scope="row">
          {!isUpdate && (
            <div>
              <img style={{ width: '150px', verticalAlign: 'middle'}} 
               src={picture} />
            </div>
          )}
          {isUpdate && (
            <div className='mt20 mb20 ml20 mr20 textal' style={{}}>
              <input type="file"
                onChange={(e) => uploadFile(e.target.files[0])} />
            </div>          
          )} 
        </TableCell>  */}
        
        <TableCell  align="center" scope="row"> 
          <Button variant="contained" size="large" onClick={update_membership_plan} >
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


export function BasicTable({membershipPlansList}) { 
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ }} >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <EditIcon/>
              </TableCell>
            <TableCell align="center">Plan Name</TableCell>
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
        membershipPlansList=== {JSON.stringify(membershipPlansList)}
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
        123
        <ResponsiveAppBar/>
        <div className='pl20 pt10 mt20 hsplit '>
          <div className=''>  
            <Button variant="contained" size="large" >Add New Membership Plans</Button>  
          </div>         
        </div>
        <AddMembershipPlans/>
        <div className='p2030' style={{}}>
          <div className='themecolor2 p20 fs25 bseee1'>All Membership Plans</div>
          <BasicTable membershipPlansList={membershipPlansList} />  
        </div>
      </div>
      </>
	);
}

export default AdminManageMemberships;