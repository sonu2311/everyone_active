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
import { useParams } from 'react-router-dom';
import {SessionContext} from './library';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function MembershipJoinPage(){
  const {id} = useParams()
	const [card_number, setcard_number]= React.useState("")
  const [name, setname]= React.useState("")
  const [expiry, setexpiry]= React.useState("") 
  const [cvv, setcvv] = React.useState("")
  const [billing_address, setbilling_address]= React.useState("")
  const [planName, setPlanName]= React.useState("")
  const [price, setPrice]= React.useState(0)
  const [termsAndConditions, setTermsAndConditions]= React.useState("") 
  const [paymentFrequency, setPaymentFrequency] = React.useState("")
  const [expiryDuration, setExpiryDuration]= React.useState("")
  const [expiryDurationUnit, setExpiryDurationUnit]= React.useState("")
  const [session, setSession] = React.useContext(SessionContext)
  const [pricePlanList, setPricePlanList]= React.useState([])
  const [status, setStatus] = React.useState("")


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
  
	
  const join_membership = function(){	
		api("/join_membership", {membership_plan_id: id
    , card_number: card_number, name: name, expiry: expiry, cvv: cvv, billing_address: billing_address}, 
			function(backend_output){
			console.log("backend_output=",backend_output )
			if("error" in backend_output) {
				alert(backend_output.error)
				console.log(backend_output.error)
			}
			else{
        setStatus(backend_output.status )
        alert(backend_output.status)
				console.log("join_membership===",backend_output.status )
				
			}
		})
	}
	return (
		<div>
			<ResponsiveAppBar/>
      <div style={{"marginTop": "100px"}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
            <Grid item  md={2} lg={2}> 
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <div className='ml20 mr20  boxs ' style={{}}>
                {pricePlanList.map((x)=>(
                  <>
                  {id==x.id &&(
                    <div className=''>
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
                          <p className='textal'>
                          Terms And Conditions : <p>
                          {x.terms_and_conditions} x.terms_and_conditions x.terms_and_conditions x.terms_and_conditions x.terms_and_conditions x.terms_and_conditionsx.terms_and_conditions
                            </p>
                          </p>
                        </div>
                      </div>                        
                    </div>
                  )}
                  </>
                ))}     
              </div>        
              <div className='ml20 mb30 mr20 '> 
                <div className=' pl30 login_header5 fontarial ' style={{}}>
                   Join Membership
                </div> 
                <div className='mb50 ml20 boxs pl30 card' style={{}}>  
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Name" type="text" name="name" value={name} onChange={(e)=> setname(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="card number" type="text" name="name" value={card_number} onChange={(e)=> setcard_number(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="cvv" type="text" name="name" value={cvv} onChange={(e)=> setcvv(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="billing address" type="text" name="name" value={billing_address} onChange={(e)=> setbilling_address(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    {/* <TextField fullWidth label="expiry" type="text" name="name" value={expiry} onChange={(e)=> setexpiry(e.target.value)} /> */}

                    <TextField fullWidth label="expiry" type="date" color="secondary" focused value= {expiry} onChange={(e)=>setexpiry(e.target.value)} />
                  </div>
                  <div className='textal p20 ml10'>
                    <Button variant="contained" disableElevation onClick={join_membership}>
                      Join Membership
                    </Button>
                  </div>
                </div>  
              </div>
            </Grid>
            <Grid item  md={2} lg={2}>
            </Grid>
          </Grid>
        </Box>      
      </div>			
		</div>
	);
}

export default MembershipJoinPage;