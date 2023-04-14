import './library.css';
import React from 'react';
import {api} from './library';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {SessionContext} from './library';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.20),
  },
  marginLeft: 0,
  // width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(1),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));



export function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [session, setSession] = React.useContext(SessionContext)
  const [isshowSideBar, setIsShowSideBar] = React.useState(false)
  const IsLogin = ("login_key" in session && "id" in session.login_key && session.login_key.id != null)
  const role = ("login_key" in session && "role" in session.login_key && session.login_key.role)
  

  const show_sidebar = function(){ 
    setIsShowSideBar(!isshowSideBar)
  }


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (<>
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 20,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >  
         
            <img alt="" src="images/logo.png" style={{width:"70px"}}></img>
          </Typography>  
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}

          >  
            <img alt="" src="images/logo.png" style={{width:"70px"}}></img>
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
              {/* {role != "ADMIN" && ( */}
                <a className='a_deco aoutline show-sm show-xs show-md show-lg' href="#/Schedule_Booking_Page">
                  <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                   Schedule Booking Page
                  </Button>
                </a>
              {/* )} */}
              {IsLogin  && (
              <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/Price_plan_page">
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 Price plan page
                </Button>
              </a>
              )}
              {!IsLogin  && (
              <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/Price_plan_page">
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 Price plan page
                </Button>
              </a>
              )}
              
              {IsLogin  && role=="ADMIN" &&  (
              <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/admin_all_users">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Admin all users
                </Button>
              </a>
              )}
              {IsLogin && role=="ADMIN" && (
              <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/Admin_manage_memberships">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 Admin manage memberships
                </Button>
              </a>
              )}
              {IsLogin && role=="ADMIN" && (
                <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/Admin_manage_studio">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Admin manage studio
                  </Button>
                </a>
              )}
              
              {IsLogin && role=="ADMIN" && (
                <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/Admin_trainers_and_schedule_type_page">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Admin trainers and schedule type page
                  </Button>
                </a>
              )}

              {IsLogin && role=="ADMIN" && (
                <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/Admin_manage_schedule_page">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Admin manage schedule page
                  </Button>
                </a>
              )}

              {IsLogin && (role=="ADMIN" || role=="STUDIO")  && (
                <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/Studio_check_in_page">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Studio checkin page
                  </Button>
                </a>
              )}
              
              {!IsLogin && (
                <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/login">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  login
                  </Button>
                </a>
              )}
              {!IsLogin && (
                <a className='a_deco aoutline hide-sm hide-xs show-md show-lg' href="#/signup">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Signup
                  </Button>
                </a>
              )}              
          </Box>
          <div className='fs18  boxs mr5'>{session.login_key.name}</div>
          {IsLogin && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open">
              <AccountCircleIcon style={{fontSize:"40px"}} onClick={handleOpenUserMenu}/>
            </Tooltip>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              <MenuTabs session={session} role={role} IsLogin={IsLogin}/>
            </Menu>
            
          </Box>
          )}
          {!IsLogin && (
          <Box className='hide-md hide-lg show-xs show-sm' sx={{ flexGrow: 0 }}>
            <Tooltip title="Open">
              <MenuIcon onClick={handleOpenUserMenu}/>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              <MenuTabs session={session} role={role} IsLogin={IsLogin}/>
            </Menu>
          </Box>
          )}
          
        </Toolbar>
      </Container>
    </AppBar>
    <div style={{height: "75px"}} ></div>
  </>);
};

const MenuTabs = function({session, role, IsLogin}){

  const logout =function(){
    api('/logout',{}, function(backend_output){
      if("error" in backend_output){
      alert(backend_output.error)
      }
      else{
        window.location.href = "#/login"
      } 
    });
  }

  return (
    <>
      {IsLogin &&(
      <a className='a_deco aoutline' href={"#/profile_page/" + session.login_key.id} >
        <MenuItem>
          <Typography textAlign="center">Profile ({session.login_key.name})</Typography>
        </MenuItem>
      </a>
      )}
      {role !="ADMIN" && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm' href="#/Schedule_Booking_Page">
          <MenuItem >
            <Typography textAlign="center">
            Schedule Booking Page
            </Typography>
          </MenuItem>
        </a>
      )}
      {!IsLogin &&(
      <a className='a_deco aoutline hide-md hide-lg show-xs show-sm' href={"#/signup"} >
        <MenuItem>
          <Typography textAlign="center">Signup</Typography>
        </MenuItem>
      </a>
      )}
      {!IsLogin &&(
      <a className='a_deco aoutline hide-md hide-lg show-xs show-sm' href={"#/login"} >
        <MenuItem>
          <Typography textAlign="center">Login</Typography>
        </MenuItem>
      </a>
      )}
      
      {IsLogin && role !="ADMIN" && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm' href="#/Price_plan_page">
          <MenuItem >
            <Typography textAlign="center">
            Price plan page
            </Typography>
          </MenuItem>
        </a>
      )}
      {IsLogin && role=="ADMIN" && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm' href="#/admin_all_users">
          <MenuItem >
            <Typography textAlign="center">
            admin all users
            </Typography>
          </MenuItem>
        </a>
      )}
       {IsLogin && (role=="ADMIN" || role=="STUDIO") && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm' href="#/Studio_check_in_page">
          <MenuItem >
            <Typography textAlign="center">
            Studio checkin page
            </Typography>
          </MenuItem>
        </a>
      )}


      {IsLogin && role=="ADMIN" && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm ' href="#/Admin_manage_memberships">
          <MenuItem >
            <Typography textAlign="center" >
            Admin manage memberships
            </Typography>
          </MenuItem>
        </a>
      )} 
      {IsLogin && role=="ADMIN" && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm ' href="#/Admin_trainers_and_schedule_type_page">
          <MenuItem >
            <Typography textAlign="center" >
            Admin_trainers_and_schedule_type_page
            </Typography>
          </MenuItem>
        </a>
      )} 
      {IsLogin && role=="ADMIN" && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm ' href="#/Admin_manage_schedule_page">
          <MenuItem >
            <Typography textAlign="center" >
            Admin_manage_schedule_page
            </Typography>
          </MenuItem>
        </a>
      )} 
      {IsLogin && role=="ADMIN" && (
        <a className='a_deco aoutline hide-md hide-lg show-xs show-sm' href="#/Admin_manage_studio">
          <MenuItem >
            <Typography textAlign="center" >
            Admin manage studio       
            </Typography>
          </MenuItem>
        </a>
      )}
      {IsLogin &&(
        <MenuItem >
          <Typography textAlign="center" onClick={logout}>Logout</Typography>
        </MenuItem>
      )}             
    </>
  )
}




// export function Header() {
//   return (
//     <div className="hsplit" >
//       <div>
//         <a href="#/example1">
//           <div className="link_box" >Example1</div>
//         </a>
//       </div>
//       <div>
//         <a href="#/example2">
//           <div className="link_box" >Example2</div>
//         </a>
//       </div>
//       <div>
//         <a href="#/example3">
//           <div className="link_box" >Example3</div>
//         </a>
//       </div>
//     </div>
//   );
// }
