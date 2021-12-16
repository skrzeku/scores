import React from 'react';
import {useSelector} from "react-redux";
import Styled from "styled-components";
import { Bar, Pie } from 'react-chartjs-2';
import {filterbyDate, indexMonth, months, types} from "../../../service";

const Row = Styled.div`

max-width: 90%;
margin: 0 auto;
`;

const Column = Styled.div`
width: 50%;
display: inline-block;
`;
const Label = Styled.label`
font-weight: bold;
`;




const EmployeeStats = (props)=> {

    const scoresAll = useSelector(state => state.scores);
    const currMonth = useSelector(state => state.month);
    const currYear = useSelector(state => state.year);
    const calendars = useSelector(state => state.calendar);


    // const currentMonth = useSelector(state => state.calendar[props.month]);
    const currentMonth = useSelector(state => state.calendar[indexMonth(props.year, months[props.month], calendars)]);

    console.log(currentMonth);

    const mapofLennght = types.map((one)=> {
        let obj = {
            name: one,
            value: 0
        };
        const filteredscores = filterbyDate(one, true, scoresAll, currentMonth)
            .filter((emp)=> emp.employee === +props.employee.id)
            .map((oni)=>oni.type).length
        obj.name = one;
        obj.value = filteredscores;
        console.log(filteredscores);
        return obj;
    }).sort((a, b)=> {
        return b.value - a.value
    });

    const kindOfScoresYear = types.map((one)=> {
        let obj = {
            name: one,
            value: 0
        };
        const filteredscores = filterbyDate(one, false, scoresAll, currentMonth, props.year)
            .filter((emp)=> emp.employee === +props.employee.id)
            .map((oni)=>oni.type).length;

        obj.name = one;
        obj.value = filteredscores;
        return obj;

    }).sort((a, b)=> {
        return b.value - a.value
    });


    const data = {
        labels: mapofLennght.map(one => one.name),

        datasets: [
            {
                label: 'Wartości miesięczne',
                data: mapofLennght.map(one => one.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,

            },
        ],
    };
    const options2 = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
    }
    const options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
    };

    const data2 = {
        labels: kindOfScoresYear.map(one=>one.name),
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false
        },
        datasets: [
            {
                label: 'Wartości roczne',
                data: kindOfScoresYear.map(one=>one.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(<div> <Column><Label>{currentMonth?.name} {props.year}</Label></Column>
        <Column><Label>Rok {props.year}</Label></Column>
        <Column><Bar  data={data} height={400} options={options2}/></Column>
        <Column>
            <Bar  data={data2}  height={400} options={options}/>
        </Column>
    </div>)
}


export default EmployeeStats;