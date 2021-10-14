import React, {useState} from 'react';
import Styled from "styled-components";
import {colorPrimary, Table, tabName} from "../../../variables";
import {useSelector} from "react-redux";
import Employees from "../../Employees/Employees";


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
    font-weight: 700;
    color: ${colorPrimary};
    }
`;
const StatsTable = ()=> {
    // Redux
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const storeMonth = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar);

    const [month, setMonth] = useState(storeMonth);
    const currentMonth = useSelector(state => state.calendar[month]);

    // global
        const countMonthEmployeeScore = (employee)=> {
            return calendar.map((oneMonth) => {
                return scoresAll
                    .filter((ons) => {
                        return ons.employee === employee.id
                    })
                    .filter(ont => {
                        const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
                        return date >= oneMonth.startDate.toDate().getTime() && date <= oneMonth?.endDate.toDate().getTime();
                    })
                    .map(obj => +obj.score)
                    .reduce((a,b)=>  a + b, 0);
            });
        }




    const CorMonth = calendar.filter((month)=> {
        const scoreThisMonth = scoresAll.filter((score)=> {
            const date = score.date.seconds ? score.date.toDate().getTime() : score.date.getTime();
            return date >= month.startDate.toDate().getTime() && date <= month.endDate.toDate().getTime();
        });
        return scoreThisMonth.length > 0 ? month : false
    });



    const monthScore = CorMonth.map((oneMonth)=> {
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
                        <TableScore className={employeeScore > 17999 ? 'plan' : ''}>{employeeScore}</TableScore>
                    )
                })
            }
        </tr>)
    });

    const TotalScores = employees.map((employee)=> {
        const summary = scoresAll
            .filter((score)=> score.employee === employee.id)
            .map(one => +one.score)
            .reduce((a,b)=> a + b, 0);
        return(
            <td>{summary}</td>
        )
    });

    const AvarageScores = employees.map((employee) => {
        const summary = scoresAll
            .filter((score)=> score.employee === employee.id)
            .map(one => +one.score)
            .reduce((a,b)=> a + b, 0);
        const sumScoresArray = countMonthEmployeeScore(employee);
        const positiveScores = sumScoresArray.map(ob => {
            return ob > 0 ? 1 : 0
        }).reduce((a,b)=> a + b, 0);

        return(<td>{Math.round(summary / positiveScores)}</td>)

    });

    const countContracts = employees.map((employee)=> {
        const summ = scoresAll
            .filter((score)=> score.employee === employee.id).length;
        return (<td>{summ}</td>)
    })

    const avarageContracts = employees.map((employee)=> {
        const summ = scoresAll
            .filter((score)=> score.employee === employee.id).length;
        const sumScoresArray = countMonthEmployeeScore(employee);
        const positiveScores = sumScoresArray.map(ob => {
            return ob > 0 ? 1 : 0
        }).reduce((a,b)=> a + b, 0);

        return(<td>{Math.round(summ / positiveScores)}</td>)

    })

    const sumNewClients = employees.map((employee)=> {
        const summ = scoresAll
            .filter((score)=> score.employee === employee.id && score.newClient);
        return (<td>{summ.length}</td>)

    });


    return(<MyTable className="table table-striped table-bordered">
        <thead>
        <tr>
            <td>Miesiąc</td>
            <Employees/>
        </tr>
        </thead>
        <tbody>
        {monthScore}
        <tr>
            <td>Suma</td>
            {TotalScores}
        </tr>
        <tr>
            <td>Średnia</td>
            {AvarageScores}
        </tr>
        <tr>
            <td>Ilość umów</td>
            {countContracts}
        </tr>
        <tr>
            <td>Średnia umów</td>
            {avarageContracts}
        </tr>
        <tr>
            <td>Nowy kiient</td>
            {sumNewClients}

        </tr>
        </tbody>
    </MyTable>)
}


export default StatsTable;