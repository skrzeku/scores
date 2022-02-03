import React from 'react';
import {useSelector} from "react-redux";
import Styled from 'styled-components';
import {Table} from "../../../variables";

const NewClientIcon = Styled.i`
color: #00CC00;
font-size: 23px;
`;




const ClientTable = ({client, id})=> {

    const TableHead = ['Typ Umowy', "Wartość", "Pracownik","Data", "Nowy klient"];
    const clientScores = useSelector(state => state.scores?.filter(one => one.client === (client ? client?.Symbol : id)));
    const employees = useSelector(state => state.employees);

    const findEmployee = (id)=> {
            const correctEmployee = employees?.find(employee => employee.id === id);
            return correctEmployee.name + ' ' +correctEmployee.lastname;
    }
    // console.log(employees);
    console.log(id);

    const MyTable = Styled.table`
    ${Table};
    width: auto;
    margin: 0 auto;
    td {
    padding: 10px 20px;
    }
    thead {
    font-weight: bold;
    }
    `;


    return(<>
        <MyTable className="table table-striped table-bordered">
            <thead>
            {TableHead.map((one)=> {
                return(<td>{one}</td>)
            })}
            </thead>
            <tbody>
            {
                clientScores.map((score)=> {
                    console.log(score.date);
                  return(
                      <tr>
                          <td>{score.type}</td>
                          <td>{score.score}</td>
                          <td>{findEmployee(score.employee)}</td>
                          <td>{score.date.toDate().toLocaleDateString()}</td>
                          <td>{score.newClient && <NewClientIcon className="las la-check"></NewClientIcon>}</td>
                      </tr>
                  )
                })
            }

            </tbody>
        </MyTable>
    </>)
}


export default ClientTable;