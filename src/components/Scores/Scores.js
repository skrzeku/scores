import React, {useState, useEffect, Fragment} from 'react';
import {useSelector} from "react-redux";
import Styled from 'styled-components';

import Score from './Score/Score';




const Scores = (props)=> {

    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const month = useSelector(state => state.month);

    const calendar = useSelector(state => state.calendar[month]);


    const weeks = [19, 18, 18, 19, 20, 21, 19, 20, 22];
        const setedWeeks = [...new Set(weeks)];
    console.log([...new Set(weeks)]);

    const Month = [1, 2, 3, 4];
        console.log(scoresAll);

    const OneRow = Styled.tr`
    min-height: 300px;
    border: solid 1px red; `;

    const TableCell = Styled.td`
    padding: 0!important;
    border: solid 1px red;
     vertical-align: top;`;

    const TableScore = Styled.p`
    margin: 0;
    border-bottom: solid 1px red; `;



    useEffect(()=> {

    }, []);

    const AllScores = employees.map((one, index)=> {
        console.log(one);
        return(<td>{one.lastname}</td>)
        // return(<Score score={one.score} scores={one} key={index}/>)
    });


    const newScores = setedWeeks.map((onet) => {
        console.log(onet);
       return (<OneRow>
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
                       })
                       .filter(ono => {
                           console.log(onet);
                           return ono.week === onet});
                   return(<TableCell>{
                                employeeScore.map((oni)=> {
                                    return (<TableScore>{oni.score}</TableScore>)
                                })
                   }</TableCell>)
               })
           }
       </OneRow>)
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