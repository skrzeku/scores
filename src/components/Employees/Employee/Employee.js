import React from 'react';
import Score from '../../Scores/Score/Score';
import {useSelector} from "react-redux";


const Employee = (props)=> {

    // console.log(props.scores);


    const scoresAll = useSelector(state => state.scores);

    const employeeScore = scoresAll.filter(one=>one.employee === props.id);
    console.log(employeeScore);

    const AllScores = employeeScore.map((one)=> {
        return(<Score score={one.score} scores={one}/>)
    });



  return(<div>
      Imię: {props.name}<br/>
      Nazwisko: {props.lastName}<br/>
      Wyniki: {AllScores}




  </div>)
};



export default Employee;