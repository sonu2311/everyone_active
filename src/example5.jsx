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
   }  
   return tmp_list
 }


 const get_upcomming_days =function(p){
  const d=new Date()
  d.setDate(d.getDate()+p)
  var tmp_list = []
  var tmp_list2 =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
   for (let i = 0; i < 7; i++){
    console.log("tmp_list2.length ===", tmp_list2.length)
    tmp_list[i]=tmp_list2[(d.getDay()+p)%tmp_list2.length]  
     d.setDate(d.getDate()+1)
     console.log("tmp_list ===", tmp_list)
     console.log("tmp_list2.length7878 ===", tmp_list2.length)
   }  
   return tmp_list
 }

function Example51() {
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


function Example5() {
  const counter= React.useRef(0)
  const [upcommingDaysList, setUpcommingDaysList]= React.useState(get_upcomming_dates(0))
  const [daysList, setDaysList]= React.useState(get_upcomming_days(0))

  const previous = function(){
    counter.current=counter.current-7  
    setUpcommingDaysList(get_upcomming_dates(counter.current))
  }

  const next = function(){
    counter.current=counter.current+7
    setUpcommingDaysList(get_upcomming_dates(counter.current))
    setDaysList(get_upcomming_days(counter.current))
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
      <p>daysList={JSON.stringify(daysList)}</p>

      <p>upcommingDaysList={JSON.stringify(upcommingDaysList)}</p>
    </div>
  );
}

export default Example5;
