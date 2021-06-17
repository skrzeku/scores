import React from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";

const OneMinus = Styled.span`
display: inline-block;
padding: 5px;
font-size: 13px;
color: red;
`;





const Minuses = (props)=> {


  const minuses = useSelector(state => state.minuses);
    const month = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar[month]);





    const MonthMinuses = minuses.filter((one)=> one.employee === props.id)
        .filter((oni)=> {
            const date = oni.date.seconds ? oni.date.toDate().getTime() : oni.date.getTime();
            return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
        });
  const min =  MonthMinuses.map((one)=> one.minus);
  const lol = min.length >0 ? min[0] : [];


  return(<td>{
        lol.map((min)=>{
          return(<OneMinus>-{min}</OneMinus>)
        })
  }</td>)
};



export default Minuses;