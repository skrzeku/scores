import React from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";

const OneMinus = Styled.span`
display: inline-block;
padding: 5px;
font-size: 13px;
`;





const Minuses = (props)=> {


  const minuses = useSelector(state => state.minuses);


  const MonthMinuses = minuses.filter((one)=> one.employee === props.id);
  const min =  MonthMinuses.map((one)=> one.minus);
  const lol = min.length >0 ? min[0] : [];


  return(<td>{
        lol.map((min)=>{
          return(<OneMinus>-{min}</OneMinus>)
        })
  }</td>)
};



export default Minuses;