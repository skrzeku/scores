import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";
import {MenuItem, Select} from "@material-ui/core";
import {globalTitle, tabName} from "../../../variables";


//styles
const MyTable = Styled.table`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    margin: 0 auto;
    width: 65%;
    border-radius: 15px;
  `;

const SelectWrapper = Styled.div`
text-align: center;
input, div {
min-width: 130px;
}
`;
const Title = Styled.div`
${globalTitle}
margin-bottom: 20px;
`;

const TabName = Styled.h2`
${tabName}
`;

const NameWrapper = Styled.div`
display: flex;
width: 65%;
margin: 0 auto;
justify-content: space-between;
`;



const EmployeeDetails = (props)=> {

    console.log(props);
    //redux
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const storeMonth = useSelector(state => state.month);

    //local state
    const [month, setMonth] = useState(storeMonth);
    const calendar = useSelector(state => state.calendar[month]);
    const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    const headArray = ['l.p.', 'Wynik', 'Typ','nr klienta', 'data'];





    console.log(calendar);


    const currentEmployee = employees?.find((one)=>one.id === +props.id);
    const currentScores = scoresAll
        .filter((score)=> score.employee === +props.id)
        .filter(ont => {
            const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
            return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
        });


    console.log(currentScores);

    const scoreTable = currentScores.map((one, index)=> {
        return (<tr>
            <td>{index + 1}</td>
            <td>{one.score}</td>
            <td>{one.type}</td>
            <td>{one.client}</td>
            <td>{one.date.toDate().toLocaleDateString()}</td>
        </tr>)
    });





    useEffect(()=> {

    });


    return(<div>
        <TabName><span>Wyniki pracownika</span></TabName>
        <NameWrapper>
            <Title>{currentEmployee?.name} {currentEmployee?.lastname[0] + '.'}</Title>
            <SelectWrapper>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={month}
                    value={month}
                    onChange={event => setMonth(event.target.value)}
                >
                    {months.map((option, index) => (
                        <MenuItem key={index} value={index}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </SelectWrapper>
        </NameWrapper>





        {scoreTable.length > 0 ?
            <MyTable>
                <thead>
                {
                    headArray.map((one)=> {
                        return(<th>
                            {one}
                        </th>)
                    })
                }
                </thead>
                <tbody>
                {scoreTable}
                </tbody>
            </MyTable> :
            <h3>Brak wyników w tym miesiącu</h3>
        }


    </div>)
};




export default EmployeeDetails;