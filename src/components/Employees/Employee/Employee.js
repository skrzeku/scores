import React from 'react';
import Scores from '../../Scores/Scores';



const Employee = (props)=> {
  return(<div>
      <tr><td>Imię: {props.name}</td> <td>Wynik: <Scores/></td></tr>

  </div>)
};



export default Employee;