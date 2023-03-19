import {ResponsiveAppBar} from './header'
import React from 'react';
import {api} from './library';
import './main.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export function BasicTable({uersList}) {  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ><b>Name</b></TableCell>
            <TableCell ><b>Email</b></TableCell>
            <TableCell ><b>User Type</b></TableCell>
            <TableCell align="right"><b>Image</b></TableCell>           
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Users-{JSON.stringify(uersList)} */}
          {uersList.map((row) => (   
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <a href= {"#/profile_page/"+row.id}  >
                  {row.name}
                </a>
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.role}</TableCell>
              <TableCell align="right">
                {row.profile_pic}
              </TableCell>     
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AdminAllUsers() {
  const [usersList, setUsersList]=React.useState([])

  // # Get the list of all users.
  // # Only admin can use this API.
  // #
  // # Input: {}
  // # Sample Output: {"all_users": [{"id": 1, "name": "Name1", ...},
  // #                               {"id": 2, "name": "Name2", ...}]}
  // # Possible Output: {"error": "Admin must be logged in for this API"}

  React.useEffect(()=> {
    api("/admin_get_all_users", {}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("admin_get_all_users=== ",backend_output )
        setUsersList(backend_output.all_users)
      } 
    })
  },[])

  return (
    <div >
      <ResponsiveAppBar/>
      <div className='p30 mt30' style={{}}>
        <div className='themecolor2 p20 fs25 bseee1 '>All Users</div>
        <BasicTable uersList={usersList} />
        
      </div>
    </div>
  );
}

export default AdminAllUsers;