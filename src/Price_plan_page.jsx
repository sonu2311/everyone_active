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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

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
      <div style={{"marginTop": "70px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item  md={1} lg={1}> 
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10}>
                <div className='login_header2 ml20 mr20 br2 fs25' style={{}}>
                  All Price Plan
                </div>
                <div className=' boxs' style={{}}>     
                  <Grid container >
                    {pricePlanList.map((x)=>( 
                      <Grid xs={12} sm={12} md={4} lg={4}> 
                          <div className=' boxs m20 '>  
                            <div className='card'  >
                              <div className='textal' style={{}}>
                                <p className='textal'>
                                Name Of Plan : {x.name}
                                </p>
                                <p className='textal'>
                                  Price :{x.price}<CurrencyRupeeIcon className='' style={{"fontSize":"15px"}}/>   
                                </p>
                                
                                <p className='textal'>
                                Payment Frequency : {x.payment_frequency}
                                </p>
                                <p className='textal'>
                                Expiry Duration : {x.expiry_duration}
                                </p>
                                <p className=' textal'>
                                Expiry Duration Unit : {x.expiry_duration_unit}
                                </p>
                              </div>
                              <div>
                                {!IsLogin && (
                                  <div>
                                    <a className='' href="#/login/">
                                      <Button size="small"
                                      variant="contained" disableElevation>
                                       Join
                                      </Button>
                                    </a>
                                  </div>           
                                )}
                                {IsLogin && (
                                  <div>
                                    <a className='' href={"#/Membership_join_page/"+x.id} 
                                    >
                                      <Button size="small"
                                      variant="contained" disableElevation>
                                        Join
                                      </Button>
                                    </a>
                                  </div>                           
                                  )}
                              </div>
                            </div>  
                          </div>
                      </Grid>  
                    ))}
                  </Grid>
                </div>
            </Grid>
            <Grid item  md={1} lg={1}>
            </Grid>
          </Grid>
        </Box>
        
      </div>
			
		</div>
	);
}

export default PricePlanPage;