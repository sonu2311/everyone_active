import {Header} from './header';
import React from 'react';
import Button from '@mui/material/Button';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Example3() {
  const [list, setList] = React.useState(["a", "b", "c"])
  const [list2, setList2] = React.useState([])
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };




  const OneCheckboxChange =function(value, checkboxindex){
    var tmp_list = [...list2]
    tmp_list[checkboxindex] = value 
    setList2(tmp_list)
  }
  const date_to_string =function(epoc_time){ 
    const Month=""+(epoc_time.getMonth()+1)
    const date=""+epoc_time.getDate()
    const Hours=""+epoc_time.getDate()
    const Minutes=""+epoc_time.getDate()
    const date_time = epoc_time.getFullYear()+"-"+Month.padStart(2,"0")+"-"+date.padStart(2,"0")
    // +
    // "T"+Hours.padStart(2,"0")+":"+Minutes.padStart(2,"0")
    return date_time
  
   }

  return (
    <div >
      <Button variant="contained">Hello World</Button>;
      <div>
        Example3...
        {list.map((x, checkboxindex)=>(
          <>
          <div className='bsr1'>
            <Checkbox {...label} checked={list2[checkboxindex]||false }  onChange={(e)=>OneCheckboxChange(e.target.checked, checkboxindex)} />
            {x} 
            <br/>
            list={JSON.stringify(list)}
            list2={JSON.stringify(list2)}
            <br/>
          </div>   
          </>
        ))}
      </div>

      Icon = <AcUnitIcon/>


      <div>
        {/* {buttons} */}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        />
    </div>



    </div>
  );
}





function Example31() {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button
        onClick={handleClick({
          vertical: 'bottom',
          horizontal: 'right',
        })}
      >
        Bottom-Right
      </Button>
    </React.Fragment>
  );

  return (
    <div>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </div>
  );
}

  // const get_upcomming_days =function(p){
  //   const d=new Date()
  //   d.setDate(d.getDate()+p)
  //   var tmp_list = []
  //   var tmp_list2 =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  //    for (let i = 0; i < 7; i++){
  //     tmp_list[i]=tmp_list2[d.getDay()]  
  //      d.setDate(d.getDate()+1)
  //      console.log("tmp_list ===", tmp_list)
  //    }  
  //    return tmp_list
  //  }

  //  const days_show= function(){
  //   setUpcommingDaysList(get_upcomming_days(counter))
  //  }






export default Example3;
