import React from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";




const History = ()=> {

        //redux
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);


    console.log(scoresAll);
        //Styles
    const MyTable = Styled.table`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    margin: 0 auto;
    width: 95%;
    border-radius: 15px;
  `;


    const headArray = ['l.p.', 'Wynik', 'Typ', 'Sprzedawca', 'Dodane przez', 'nr klienta', 'data'];



    const tableHead = headArray.map((head)=> {
        return (<td>{head}</td>)
    });

    const allhistory = scoresAll.slice(0, 20).map((score, index)=> {
        const employee = employees.find((one)=> {
            return one.id === score.employee
        });
        return(<tr><td>{index + 1}</td> <td>{score.score}<span>{score.mailing ? ' M' : ''}</span></td><td>{score.type}</td> <td>{employee.name}</td><td>{score.user}</td><td>{score.client}</td><td>{score.date.toDate().toLocaleDateString()}</td></tr>)
    });
    return(<div><h2>Oststnio dodane wyniki:</h2>
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