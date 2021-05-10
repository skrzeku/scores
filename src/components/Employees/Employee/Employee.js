import React from 'react';
import Scores from '../../Scores/Scores';



const Employee = (props)=> {

    console.log(props.scores);



  return(<div>
      Imię: {props.name}<br/>
      Nazwisko: {props.lastName}<br/>
      Wyniki:{props.scores}<Scores/>




  </div>)
};



export default Employee;