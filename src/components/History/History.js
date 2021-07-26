import React from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";
import {Link, useLocation} from "@reach/router";
import {tabName} from "../../variables";





const History = ()=> {

        //redux
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const location = useLocation();



    console.log(scoresAll);
    console.log(location);
        //Styles
    const MyTable = Styled.table`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    margin: 0 auto;
    width: 95%;
    border-radius: 15px;
  `;

    const TabName = Styled.h2`
${tabName}
`;


    const headArray = ['l.p.', 'Wynik', 'Typ', 'Sprzedawca', 'nr klienta', 'data'];



    const tableHead = headArray.map((head)=> {
        return (<th>{head}</th>)
    });

    const allhistory = scoresAll.slice(0, 30).map((score, index)=> {
        const employee = employees.find((one)=> {
            return one.id === score.employee
        });
        return(<tr><td>{index + 1}</td> <td>{score.score}<span>{score.mailing ? ' M' : ''}</span></td><td>{score.type}</td> <td>{employee?.name} {employee?.lastname}</td><td>{score.client}</td><td>{score.date.seconds ? score.date.toDate().toLocaleDateString() : score.date.toLocaleDateString()}</td></tr>)
    });
    return(<div>        <TabName><span>Historia</span></TabName>

        <h3>{location.name}</h3>

        <MyTable className="table table-striped table-bordered">
            <thead>
            <tr>
            {tableHead}
            </tr>
            </thead>
            <tbody>
            {allhistory}
            </tbody>
        </MyTable>
    </div>)
};



export default History;