import React from 'react';
import Score from '../../Scores/Score/Score';
import {useSelector} from "react-redux";
import Scores from '../../Scores/Scores';


const Employee = (props)=> {

    // console.log(props.scores);


    const scoresAll = useSelector(state => state.scores);

    const month = useSelector(state => state.month);

    const calendar = useSelector(state => state.calendar[month]);

    const lol = scoresAll.map((one) => one.date);

    // console.log(lol);

    const today = new Date();
    const weekNumber = today.getWeek();
 



    // console.log(calendar);

    const employeeScore = scoresAll
        .filter(one=>one.employee === props.id)
        .filter(ons => {
            const date = ons.date.seconds ? ons.date.toDate().getTime() : ons.date.getTime();
                // if (!ons.date.seconds) {
                //     date = ons.date
                // }
                // else {
                //     date = ons.date.toDate().getTime();
                // }
            // let date = ons.date;


                return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
                // if (!date.seconds) {
                //     return new Date(ons.date).getMonth() === month;
                // }
                // else {
                //     return ons.date.toDate().getMonth() === month;
                // }
        });



    const AllScores = employeeScore.map((one, index)=> {
        return(<Score score={one.score} scores={one} key={index}/>)
    });



  return(<th>
      {/*Imię: {props.name}<br/>*/}
      {/*Nazwisko: {props.lastName}<br/>*/}
      {props.name + ' ' + props.lastName[0] + '.'}
      {/*Wyniki: {AllScores}*/}

      {/*<Scores scores = {employeeScore} />*/}


  </th>)
};



export default Employee;