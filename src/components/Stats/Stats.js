import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Employees from "../Employees/Employees";
import Styled from "styled-components";
import {Table, tabName} from "../../variables";

const MyTable = Styled.table`
   ${Table};
   margin-top: 80px;
  `;
const TabName = Styled.h2`
${tabName};
display: block;
`;

const TableScore = Styled.td`
font-size: 14px;
    &.plan {
    color: blue;
    }
`;


const Stats = ()=> {
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const storeMonth = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar);


    const [month, setMonth] = useState(storeMonth);
    const currentMonth = useSelector(state => state.calendar[month]);


    const monthScore = calendar.map((oneMonth)=> {
       return(<tr>
           <td>{oneMonth.name}</td>
           {
               employees.map((employee)=>{
                   const employeeScore = scoresAll
                        .filter((ons) => {
                            return ons.employee === employee.id
                        })
                       .filter(ont => {
                           const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
                           const currMonth = oneMonth.id;
                           return date >= oneMonth.startDate.toDate().getTime() && date <= oneMonth?.endDate.toDate().getTime();
                       })
                       .map(obj => +obj.score)
                       .reduce((a,b)=>  a + b, 0);

                   return(
                       <TableScore className={employeeScore > 18000 ? 'plan' : ''}>{employeeScore}</TableScore>
                   )
               })
           }

       </tr>)
    });

    return(<div>
        <TabName><span>Statystyki</span></TabName>
        <MyTable className="table table-striped table-bordered">
            <thead>
                <tr>
                    <td>Miesiąc</td>
                    <Employees/>
                </tr>
            </thead>
            <tbody>
            {monthScore}
            </tbody>
        </MyTable>
    </div>)
};



export default Stats;