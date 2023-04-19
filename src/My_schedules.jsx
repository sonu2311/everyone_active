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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';



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


export function Row({row, row1}) {
  const [studioId, setStudiosId]= React.useState(row)

  // if (isDeleted){
  //   return <></>
  // }
  return (
    <>
    <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell  align="left" scope="row"></TableCell>
        <TableCell  align="left" scope="row">   
          row= {JSON.stringify(row)}
        </TableCell>
        <TableCell  align="center" scope="row"> </TableCell>
        <TableCell  align="center"></TableCell>
    
        <TableCell  align="center"></TableCell>
      </TableRow>
    </>
  ) 

}

export function BasicTable({upcomingBookingsList, pastBookingsList}) { 
  
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
        {upcomingBookingsList.map((row) => (
          <Row row={row}/>
        ))} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function PastBookingsListRow({row}) {
  const [studioId, setStudiosId]= React.useState(row)

  // if (isDeleted){
  //   return <></>
  // }
  return (
    <>
    <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell  align="left" scope="row"></TableCell>
        <TableCell  align="left" scope="row">   
          row1= {JSON.stringify(row)}
        </TableCell>
        <TableCell  align="center" scope="row"> </TableCell>
        <TableCell  align="center"></TableCell>
        <TableCell  align="center"></TableCell>
      </TableRow>
    </>
  ) 

}

export function PastBookingsList({pastBookingsList}) { 
  
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
          {pastBookingsList.map((row) => (
            <PastBookingsListRow row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function MySchedules(){
  const [upcomingBookingsList, setUpcomingBookingsList]= React.useState([1, 2,3])
  const [pastBookingsList, setPastBookingsList]= React.useState([4,5,6])
  const [files, setFiles] = React.useState([])
  const [value1, setValue1] = React.useState(0);
  
  function TabPanel(props) {
    const {children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
   
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };

	return (
    <>
      <div >
        <ResponsiveAppBar/> 
        <div className='p2030 boxs mt30' style={{}}>
          <div className=' br2 p20 fs18  fw700 fontarial  '>All Schedules</div>
          <div className='boxs'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value1} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Upcoming Bookings" {...a11yProps(0)} />
              <Tab label="Past Bookings"  {...a11yProps(1)} />                                           
            </Tabs>                   
          </Box> 
          <TabPanel className="exam_paper " value={value1} index={0} style={{ }} >
              <div className=''> 
              Upcoming Bookings

              <BasicTable upcomingBookingsList={upcomingBookingsList} />             
              </div>                  
          </TabPanel> 
          <TabPanel value={value1} index={1}>
            <div>Past Bookings
              <PastBookingsList pastBookingsList={pastBookingsList}/>
            </div>          
          </TabPanel> 
          </div>                      
        </div>
      </div>
      </>
	);
}

export default MySchedules;