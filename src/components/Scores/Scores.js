import React, {useState, useEffect, Fragment} from 'react';
import {useSelector} from "react-redux";
import Styled from 'styled-components';

import Score from './Score/Score';




const Scores = (props)=> {

    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const month = useSelector(state => state.month);

    const calendar = useSelector(state => state.calendar[month]);

    const Month = [1, 2, 3, 4];
        console.log(scoresAll);

    const OneRow = Styled.tr`
    min-height: 300px;
    border: solid 1px red; `;

    useEffect(()=> {

    }, []);

    const AllScores = employees.map((one, index)=> {
        console.log(one);
        return(<td>{one.lastname}</td>)
        // return(<Score score={one.score} scores={one} key={index}/>)
    });


    const newScores = Month.map((one) => {
       return (<tr>
           {
               employees.map((one, index)=> {
                   const employeeScore = scoresAll
                       .filter(ons=>ons.employee === one.id)
                   .filter(ont => {
                           const date = ont.date.toDate().getTime();
                           return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
                           // if (!date.seconds) {
                           //     return new Date(ons.date).getMonth() === month;
                           // }
                           // else {
                           //     return ons.date.toDate().getMonth() === month;
                           // }
                       });
                   console.log(employeeScore);
                   return(<td>siema{

                   }</td>)
               })
           }
       </tr>)
    });





    // const allScores = [990, 990, 1500];


    // const mapScores = scores.map((one)=> {
    //     return(<div><Score /></div>)
    // });


    return(<React.Fragment>
      {newScores}


    </React.Fragment>)
};



export default Scores;