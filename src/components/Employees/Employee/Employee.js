import React from 'react';
import Score from '../../Scores/Score/Score';
import {useSelector} from "react-redux";


const Employee = (props)=> {

    // console.log(props.scores);


    const scoresAll = useSelector(state => state.scores);

    const month = useSelector(state => state.month);

    const employeeScore = scoresAll
        .filter(one=>one.employee === props.id)
        .filter(ons=>ons.date.toDate().getMonth() === month);

    // const lol = employeeScore.filter(ons=>ons.date.toDate().getMonth() === 3);
    // console.log(lol);

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