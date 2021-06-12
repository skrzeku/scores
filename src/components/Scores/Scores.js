import React, {useState, useEffect, Fragment} from 'react';
import {useSelector} from "react-redux";
import Styled from 'styled-components';

import Score from './Score/Score';
import {colorPrimary} from "../../variables";




const Scores = ()=> {

    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const month = useSelector(state => state.month);

    const calendar = useSelector(state => state.calendar[month]);


    const weeks = [19, 18, 18, 19, 20, 21, 19, 20, 22];
        const setedWeeks = [...new Set(weeks)];
    console.log([...new Set(weeks)]);

         const sequential = (to, from = 0)=> {
            return  Array.from(Array(to + 1).keys()).slice(from)
    };



    let correctweeks = [];

    if (calendar?.startDate) {
        correctweeks = sequential(calendar?.endDate.toDate().getWeek(), calendar?.startDate.toDate().getWeek());

    }


   //  const range = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);
   //  for (let i of range(20,25)) {
   //     console.log(i);
   // }
   //  console.log(calendar?.startDate.toDate().getWeek());

    const Month = [1, 2, 3, 4];
        // console.log(scoresAll);

    const OneRow = Styled.tr`
    // border: solid 1px red; `;

    const TableCell = Styled.td`
     padding: 0px !important;
    
   // margin: 0;
   //  border: solid 1px red;
   //   vertical-align: top;`;

    const TableScore = Styled.p`
    margin: 0;
    border-bottom: solid 1px #dee2e6;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    min-height: 35px;
     &:last-child {
     border: none;
     }
     `;
    const Mailing = Styled.span`
    display: inline-block;
    font-size: 13px;
    color: ${colorPrimary};
    `;

    const SummaryCell = Styled.td`
    font-weight: bold;
    border-top: solid 2px ${colorPrimary};
    border-top-width: 2px !important;
    `;
    const Summary = Styled.tr`
    font-weight: bold;
  
    `;



    useEffect(()=> {

    }, []);

    const AllScores = employees.map((one, index)=> {
        // console.log(one);
        return(<td>{one.lastname}</td>)
        // return(<Score score={one.score} scores={one} key={index}/>)
    });


    const newScores = correctweeks.map((onet) => {
       return (<OneRow>{
               employees.map((one, index)=> {
                   const employeeScore = scoresAll
                       .filter(ons=>ons.employee === one.id)
                       .filter(ont => {
                           const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
                           return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
                       })
                       .filter(ono => {
                           return ono.week === onet});
                   return(<TableCell>{
                            employeeScore.length > 0 ?
                                employeeScore.map((oni)=> {

                                    return (<TableScore>{oni.score} {oni.short}<Mailing>{oni.mailing? 'M' : ''}</Mailing></TableScore>)
                                })
                                : (<TableScore></TableScore>)
                   }</TableCell>)
               })
           }</OneRow>)
    });

    const summary = employees.map((employee)=> {
                const employeeScore = scoresAll
                    .filter(ons=>ons.employee === employee.id)
                    .filter(ont => {
                        const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
                        return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
                    });


                const summ = employeeScore
                    .map(obj => +obj.score)
                    .reduce((a,b)=>  a + b, 0);

                const mailingLength = employeeScore.map(ob => {
                    return ob.mailing ? 1 : 0
                }).reduce((a,b)=> a + b, 0);

        return(<SummaryCell>{summ} <Mailing> {mailingLength}</Mailing></SummaryCell>)

            });











    // const allScores = [990, 990, 1500];


    // const mapScores = scores.map((one)=> {
    //     return(<div><Score /></div>)
    // });


    return(<React.Fragment>
        <tbody>{newScores}
        <Summary> {summary} </Summary>
        </tbody>



    </React.Fragment>)
};



export default Scores;