import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Employees from "../Employees/Employees";
import Styled from "styled-components";
import {Table, tabName} from "../../variables";
import StatsTable from "./StatsTable/StatsTable";
import Charts from "./Charts/Charts";
import {MenuItem, Select} from "@material-ui/core";
import {months, years} from "../../service";

const MyTable = Styled.table`
   ${Table};
   margin-top: 80px;
  `;
const TabName = Styled.h2`
${tabName};
display: block;
`;

const SelectWrapper = Styled.div`
text-align: left;
max-width: 90%;
margin: 70px auto 0;

input, div {
min-width: 130px;
}
`;


const Stats = ()=> {
    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const storeMonth = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar);
    const storeYear = useSelector(state => state.year);


    const [month, setMonth] = useState(storeMonth);
    const [year, setYear] = useState(storeYear);
    const currentMonth = useSelector(state => state.calendar[month]);
    // const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

    useEffect(()=> {
        setMonth(storeMonth);
        setYear(storeYear);
    }, [storeMonth])



    return(<div>
        <TabName><span>Statystyki</span></TabName>

        <StatsTable/>
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
            <Select
                defaultValue={year}
                value={year}
                onChange={event => setYear(event.target.value)}
            >
                {years.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </SelectWrapper>
        <Charts month={month} year={year}/>
    </div>)
};



export default Stats;