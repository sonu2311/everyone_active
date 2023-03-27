import {Header} from './header';
import React from 'react';
import Button from '@mui/material/Button';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Example3() {
  const [list, setList] = React.useState(["a", "b", "c"])
  const [list2, setList2] = React.useState([])
  


    console.log("1---list2===", list2)
    console.log("1---list===", list)
  const OneCheckboxChange =function(value, checkboxindex){
    console.log("2---list2===", list2)
    console.log("2---list===", list)
    var tmp_list = [...list2]
    console.log("3---list2===", list2)
    console.log("3---list===", list)
    tmp_list[checkboxindex] = value 
    console.log("4---list2===", list2)
    console.log("4---list===", list) 
    setList2(tmp_list)
    console.log("5---list2===", list2)
    console.log("5---list===", list)

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
      {/* <Header/> */}
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
    </div>
  );
}

export default Example3;
