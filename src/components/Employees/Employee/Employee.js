import React from 'react';
import Scores from '../../Scores/Scores';
import {useSelector} from "react-redux";


const Employee = (props)=> {

    console.log(props.id);
    console.log(useSelector(state => state.scores));



  return(<div>
      Imię: {props.name}<br/>
      Nazwisko: {props.lastName}<br/>
      Wyniki:{props.scores}<Scores/>




  </div>)
};



export default Employee;