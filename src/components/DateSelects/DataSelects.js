import React from "react";
import {MenuItem, Select} from "@material-ui/core";
import {months, years} from "../../service";
import Styled from "styled-components";

const SelectWrapper = Styled.div`
text-align: center;
input, div {
min-width: 130px;
}
`;



const DataSelects = ({month, setMonth, year, setYear})=> {
    return(
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
    )
}



export default DataSelects;