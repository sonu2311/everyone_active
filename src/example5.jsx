import {Header} from './header';
import React from 'react';
import Button from '@mui/material/Button';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const date_to_string =function(epoc_time){ 
  const Month=""+(epoc_time.getMonth()+1)
  const date=""+epoc_time.getDate()
  const Hours=""+epoc_time.getDate()
  const Minutes=""+epoc_time.getDate()

  const date_time = epoc_time.getFullYear()+"-"+Month.padStart(2,"0")+"-"+date.padStart(2,"0")
  return date_time
 }

 const get_upcomming_dates =function(p){
  const d=new Date()
  d.setDate(d.getDate()+p)
  var tmp_list = []
   for (let i = 0; i < 7; i++){
     tmp_list[i] = date_to_string(d)
     d.setDate(d.getDate()+1)
     console.log("tmp_list ===", tmp_list)
   }  
   return tmp_list
 }


function Example5() {
  const [counter, setCounter]= React.useState(0)
  const [upcommingDaysList, setUpcommingDaysList]= React.useState(get_upcomming_dates(0))
  
  const previous = function(){
    setCounter(counter-7)
    setUpcommingDaysList(get_upcomming_dates(counter-7))
  }

  const next = function(){
    setCounter(counter+7)
    setUpcommingDaysList(get_upcomming_dates(counter+7))
  }

  
   const dates_show= function(){
    setUpcommingDaysList(get_upcomming_dates(counter))
   }

  return (
    <div >
      <Button variant="contained" onClick={previous}>previous</Button>
      <Button variant="contained" onClick={next}>next</Button>
      <div>
        Example5... 
      </div>
      <p>counter={counter}</p>

      <p>upcommingDaysList={JSON.stringify(upcommingDaysList)}</p>
    </div>
  );
}


function Example51() {
  const counter= React.useRef(0)
  const [upcommingDaysList, setUpcommingDaysList]= React.useState(get_upcomming_dates(0))
  
  const previous = function(){
    counter.current=counter.current-7  
    setUpcommingDaysList(get_upcomming_dates(counter.current-7))
  }

  const next = function(){
    counter.current=counter.current+7
    setUpcommingDaysList(get_upcomming_dates(counter.current+7))
  }

  
   const dates_show= function(){
    setUpcommingDaysList(get_upcomming_dates(counter.current))
   }

  return (
    <div >
      <Button variant="contained" onClick={previous}>previous</Button>
      <Button variant="contained" onClick={next}>next</Button>
      <div>
        Example5... 
      </div>
      <p>counter.current={counter.current}</p>

      <p>upcommingDaysList={JSON.stringify(upcommingDaysList)}</p>
    </div>
  );
}

export default Example5;
