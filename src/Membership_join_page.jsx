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
				console.log("join_membership===",backend_output )
				
			}
		})
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

            <div style={{"padding":"15px"}}>
                {pricePlanList.map((x)=>(
                  <>
                  {id==x.id &&(
                    <div className='card'>{JSON.stringify(x)}</div>
                  )}
                  {/* <div className='card'>
                    {JSON.stringify(x)}   
                  </div> */}
                  </>
                ))}     
              </div>  

                <div className='login_header2 ' style={{}}>
                Join Membership
                </div>
              <Item>  
              <div style={{"padding":"15px"}}>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="Name" type="text" name="name" value={name} onChange={(e)=> setname(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="card number" type="text" name="name" value={card_number} onChange={(e)=> setcard_number(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="expiry" type="text" name="name" value={expiry} onChange={(e)=> setexpiry(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="cvv" type="text" name="name" value={cvv} onChange={(e)=> setcvv(e.target.value)} />
                  </div>
                  <div style={{"margin":"20px"}}>
                    <TextField fullWidth label="billing address" type="text" name="name" value={billing_address} onChange={(e)=> setbilling_address(e.target.value)} />
                  </div>
                  <div className='textal p20'>
                    <Button variant="contained" disableElevation onClick={join_membership}>
                      Join Membership
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

export default MembershipJoinPage;