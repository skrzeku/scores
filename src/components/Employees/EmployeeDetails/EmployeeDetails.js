import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";
import {MenuItem, Select} from "@material-ui/core";
import {globalTitle, tabName} from "../../../variables";
import EmployeeStats from "../EmployeeStats/EmployeeStats";
import DataSelects from "../../DateSelects/DataSelects";
import {indexMonth, months} from "../../../service";
import {useParams} from "@reach/router";
import {TabName} from "../../../template-parts/TabName";


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


const Heading = Styled.h2`
margin-top: 50px;
margin-bottom: 30px;
font-weight: 600;
`;


const NameWrapper = Styled.div`
display: flex;
width: 65%;
margin: 0 auto;
justify-content: space-between;
`;

const TabWrapper = Styled.div`
padding-top: 80px;
`;



const EmployeeDetails = ()=> {


    //redux
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const storeMonth = useSelector(state => state.month);
    const storeYear = useSelector(state => state.year);
    const calendars = useSelector(state => state.calendar);

    const {id} = useParams();

    //local state
    const [month, setMonth] = useState(storeMonth);
    const [year, setYear] = useState(storeYear);

    console.log(year + month);
    // const calendar = useSelector(state => state.calendar[month]);



        useEffect(()=> {
            setMonth(storeMonth);
            setYear(storeYear);
        }, [storeMonth])



    const calendar = useSelector(state => state.calendar[indexMonth(year, months[month], calendars)]);
    const headArray = ['l.p.', 'Wynik', 'Typ','nr klienta', 'data'];

    const currentEmployee = employees?.find((one)=>one.id === +id);

    const currentScores = scoresAll
        .filter((score)=> score.employee === +id)
        .filter(ont => {
            const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
            return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
        });



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


    return(<TabWrapper>

        <TabName title={'Wyniki pracownika'}/>
        <Heading>Wyniki {calendar?.name +' ' + new Date().getFullYear()} </Heading>

        <NameWrapper>
            <Title>{currentEmployee?.name} {currentEmployee?.lastname[0] + '.'}</Title>
            <SelectWrapper><DataSelects month={month} setMonth={setMonth} year={year} setYear={setYear}/></SelectWrapper>

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


        <Heading>Statystyki </Heading>
        <EmployeeStats employee={currentEmployee} month={month} year={year}/>



    </TabWrapper>)
};




export default EmployeeDetails;