import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";

const OneMinus = Styled.span`
display: inline-block;
padding: 1px 3px; 
font-size: 12px;
color: red;
max-width: 50%;
 u { 
 color: #E59400;
 font-weight: 700;
 }
    &:hover {
    cursor: pointer;
        opacity: 0.7;
    }
`;

const TableCell = Styled.td`
     padding: 0px !important;
    
   // margin: 0;
   //  border: solid 1px red;
   //   vertical-align: top;`;




const Minuses = (props)=> {


  const minuses = useSelector(state => state.minuses);
    const month = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar[month]);

    const[currentMinus, setMinus] = useState(null);





    const MonthMinuses = minuses.filter((one)=> one.employee === props.id)
        .filter((oni)=> {
            const date = oni.date.seconds ? oni.date.toDate().getTime() : oni.date.getTime();
            return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
        }).sort((a, b) => (a.client < b.client) ? 1 : -1);

    // console.log(MonthMinuses);
  // const min =  MonthMinuses.map((one)=> one.minus);
  // const lol = min.length >0 ? min[0] : [];


  return(<TableCell>{
        MonthMinuses.map((one, index)=> {
            // console.log(one);
            return(<OneMinus key={index} onClick={()=> props.setCurrentMinus(one)}>
                {
                    one.client === 9999 ? <u>-{one.minus}</u> :-one.minus
                }
                {/*-{one.minus}*/}
                </OneMinus>)
        })
  } </TableCell>)

};



export default Minuses;