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
import {SessionContext} from './library';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function PricePlanPage(){
	const [planName, setPlanName]= React.useState("")
  const [price, setPrice]= React.useState(0)
  const [termsAndConditions, setTermsAndConditions]= React.useState("") 
  const [paymentFrequency, setPaymentFrequency] = React.useState("")
  const [expiryDuration, setExpiryDuration]= React.useState("")
  const [expiryDurationUnit, setExpiryDurationUnit]= React.useState("")
  const [session, setSession] = React.useContext(SessionContext)
  const [pricePlanList, setPricePlanList]= React.useState([])
  const IsLogin = ("login_key" in session && "id" in session.login_key && session.login_key.id != null)
  

  React.useEffect(()=> {
    api("/get_all_membership_plans", {}, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
				console.log("studio added.===",backend_output )
				setPricePlanList(backend_output.results)
			}
		})
  },[])

	return (
		<div>
			<ResponsiveAppBar/>
      <div style={{"marginTop": "100px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item xs={1} sm={1} md={3} lg={3}> 
            </Grid>
            <Grid item xs={10} sm={10} md={6} lg={6}>
                <div className='login_header2 ' style={{}}>
                  Add New studio
                </div>
                {/* pricePlanList===={JSON.stringify(pricePlanList)} */}
              <Item>  
              <div style={{"padding":"15px"}}>
                {pricePlanList.map((x)=>(
                  <>
                    <div className='card'>
                      {JSON.stringify(x)}
                      {!IsLogin && (
                        <a className='' href="#/login/">
                          <Button
                          variant="contained" disableElevation>
                            Join
                          </Button>
                        </a>
                      )}
                      {IsLogin && (
                        <a className='' href={"#/Membership_join_page/"+x.id} 
                        >
                          <Button
                          variant="contained" disableElevation>
                            Join mem
                          </Button>
                        </a>
                      )}
                    </div>
                  </>
                ))}     
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

export default PricePlanPage;