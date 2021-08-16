import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Styled from 'styled-components';

import {colorPrimary} from "../../variables";
import Minuses from "../Minuses/Minuses";

import ScoreDetails from "./ScoreDetails/ScoreDetails";
import Details from "../Details/Details";




const Scores = (props)=> {

    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const month = useSelector(state => state.month);
    const minuses = useSelector(state => state.minuses);


    const [currentScore, setScore] = useState(null);


    const calendar = useSelector(state => state.calendar[month]);



    const weeks = [19, 18, 18, 19, 20, 21, 19, 20, 22];


         const sequential = (to, from = 0)=> {
            return  Array.from(Array(to + 1).keys()).slice(from)
    };




    let correctweeks = [];

    if (calendar?.startDate) {
        correctweeks = sequential(calendar?.endDate.toDate().getWeek(), calendar?.startDate.toDate().getWeek());
    }





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
    // display: flex;
    // justify-content: space-between;
    padding: 0px;
    min-height: 25px;
    
    position: relative;
        &:hover {
        cursor: pointer;
        color: ${colorPrimary}
        }
    
    
     &:last-child {
     border: none;
     }
     `;
    const ScoreType = Styled.span`
    font-size: 13px;
    `;
    const Mailing = Styled.span`
    display: inline-block;
    font-size: 12px;
    position: absolute;
    right: 5px;
    
    color: ${colorPrimary};
    `;

    const SummaryCell = Styled.td`
    font-weight: bold;
    position: relative;
    border-top: solid 2px ${colorPrimary};
    border-top-width: 2px !important;
    font-size: 19px;
    `;
    const Summary = Styled.tr`
    font-weight: bold;
    background-color: #f7f7f7;
 
    `;

    const TotalSum = Styled.td`
    font-size: 14px;
        color: ${(props)=> props.sum > 0 ? "blue" : "red"};
    `;






    const newScores = correctweeks.map((onet) => {
       return (<OneRow>{
               employees.map((one)=> {
                   const employeeScore = scoresAll
                       .filter((ons) => {
                           return ons.employee === one.id
                       })
                       .filter(ont => {
                           const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
                           return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
                       })
                       .filter(ono => {
                           return ono.week === onet});
                   return(<TableCell>{
                            employeeScore.length > 0 ?
                                employeeScore.map((oni, index)=> {

                                    return (<TableScore onClick={()=> props.setCurrentScore(oni)} key={index}>{oni.score}<ScoreType> {oni.short}</ScoreType><Mailing>{oni.mailing? 'M' : ''}</Mailing></TableScore>)
                                })
                                : (<TableScore></TableScore>)
                   }</TableCell>)
               })
           }</OneRow>)
    });



    const dynamicComponent = (score)=> {
      setScore(score);
    };




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

        return(<SummaryCell key={employee.id} >{summ} <Mailing> {mailingLength}</Mailing></SummaryCell>)
            });







    return(<React.Fragment>
        <tbody>{newScores}
        <Summary> {summary} </Summary>
        <tr>
            {
                employees.map((emp)=> {
                    return(<Minuses id={emp.id} setCurrentMinus={(prop)=> props.setCurrenMinus(prop)}/>)
                })
            }
        </tr>
        <tr>
            {
                summary.map((sum, index)=> {
                  const sumofPluses = sum?.props.children[0];
                  const id = sum.key;
                    const MonthMinuses = minuses.filter((one)=> one.employee === +id)
                        .filter((oni)=> {
                            const date = oni.date.seconds ? oni.date.toDate().getTime() : oni.date.getTime();
                            return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
                        })
                        .map((one)=> one.minus)
                        .reduce((a,b)=> {
                            return +a + +b
                        }, 0);




                  return(<TotalSum sum={ sumofPluses - MonthMinuses} key={index}>{
                      sumofPluses - MonthMinuses
                  }</TotalSum>);
                })
            }
        </tr>
        </tbody>
        {/*{*/}
            {/*currentScore && <Details object={currentScore} onClose={()=> setScore(null)} dbName={"scores"}/> }*/}



    </React.Fragment>)
};



export default Scores;