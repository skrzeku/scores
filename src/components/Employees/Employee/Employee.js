import React from 'react';
import Score from '../../Scores/Score/Score';
import {useSelector} from "react-redux";


const Employee = (props)=> {

    // console.log(props.scores);


    const scoresAll = useSelector(state => state.scores);

    const month = useSelector(state => state.month);

    const employeeScore = scoresAll
        .filter(one=>one.employee === props.id)
        .filter(ons => {
            let date = ons.date;
                if (!date.seconds) {
                    return new Date(ons.date).getMonth() === month;
                }
                else {
                    return ons.date.toDate().getMonth() === month;
                }

        });



    const AllScores = employeeScore.map((one, index)=> {
        return(<Score score={one.score} scores={one} key={index}/>)
    });



  return(<div>
      Imię: {props.name}<br/>
      Nazwisko: {props.lastName}<br/>
      Wyniki: {AllScores}


  </div>)
};



export default Employee;