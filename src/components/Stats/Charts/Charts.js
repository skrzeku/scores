import React from 'react';
import {Doughnut} from "react-chartjs-2";
import {useSelector} from "react-redux";
import Styled from "styled-components";
import { Bar, Pie } from 'react-chartjs-2';
import {filterbyDate, indexMonth, months} from "../../../service";
import {types} from '../../../service';
import {GlobalTitle} from "../../../variables";

const ChartWrapper = Styled.div`
width: 70%;
margin: 0 auto;
`;

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

const Heading = Styled.h2`
margin-top: 50px;
margin-bottom: 30px;
font-weight: 600;
`;


const Charts = (props)=> {

    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const storeMonth = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar);
    const storeYear = useSelector(state => state.year);
    const month = props? props.month : storeMonth;
    const year = props? props.year : storeYear;

    const currentMonth = useSelector(state => state.calendar[month]);
    const newCurrentMonth = useSelector(state => state.calendar[indexMonth(year, months[month], calendar)]);
    console.log(year);

    console.log(newCurrentMonth);
    console.log(currentMonth);


    //quantitative statistics

    // const filterbyDate = (one, bool)=>  scoresAll
    //     .filter((ons)=> ons.type === one)
    //     .filter((ont) => {
    //         if (bool) {
    //             const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
    //             return date >= currentMonth?.startDate.toDate().getTime() && date <= currentMonth?.endDate.toDate().getTime();
    //         }
    //         else return ont;
    //     })



    const mapofLennght = types.map((one)=> {
        let obj = {
            name: one,
            value: 0
        };
        const filteredscores = filterbyDate(one, true, scoresAll, newCurrentMonth, year)
            .map((oni)=>oni.type).length;
        obj.name = one;
        obj.value = filteredscores;
        // console.log(filteredscores);
        return obj;


    }).sort((a, b)=> {
            return b.value - a.value
        });

    console.log(mapofLennght);


    const kindOfScoresYear = types.map((one)=> {
        let obj = {
            name: one,
            value: 0
        };
        const filteredscores = filterbyDate(one, false, scoresAll, newCurrentMonth, year)
            .map((oni)=>oni.type).length;

        obj.name = one;
        obj.value = filteredscores;
        return obj;

    }).sort((a, b)=> {
        return b.value - a.value
    });


    //valuable statistics
    const valueMonth = types.map((one)=> {
        let obj = {
            name: one,
            value: 0
        };
        const filteredscores = filterbyDate(one, true, scoresAll, newCurrentMonth, year)
            .map((oni)=> +oni.score)
            .reduce((a, b)=> a + b, 0);
        obj.name = one;
        obj.value = filteredscores;
        return obj;
    }).sort((a, b)=> {
        return b.value - a.value
    });

    const valueYear = types.map((one)=> {
        let obj = {
            name: one,
            value: 0
        };
        const filteredscores = filterbyDate(one, false, scoresAll, newCurrentMonth, year)
            .map((oni)=> +oni.score)
            .reduce((a, b)=> a + b, 0);
        obj.name = one;
        obj.value = filteredscores;
        return obj;
    }).sort((a, b)=> {
        return b.value - a.value
    });

    console.log(valueMonth);

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

    const dataValueMonth = {
        labels: valueMonth.map(one => one.name),
        datasets: [
            {
                label: '# of Votes',
                data: valueMonth.map(one=>one.value),
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

    const dataValueYear = {
        labels: valueYear.map(one=>one.name),
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
                data: valueYear.map(one=>one.value),
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





    return(<Row>
        <GlobalTitle>Statystyki Ilościowe</GlobalTitle>

            <Column><Label>{newCurrentMonth?.name} {newCurrentMonth?.year}</Label></Column>
            <Column><Label>Rok {newCurrentMonth?.year}</Label></Column>

        <Column>
            <Bar  data={data} height={400} options={options2}/>
        </Column>
        <Column>
            <Bar  data={data2}  height={400} options={options}/>
        </Column>
        <GlobalTitle>Statystyki wartościowe</GlobalTitle>

        <Row>
            <Column><Label>{newCurrentMonth?.name} {newCurrentMonth?.year}</Label></Column>
            <Column><Label>Rok {newCurrentMonth?.year}</Label></Column>
        </Row>
        <Column>
            <Bar data={dataValueMonth} height={400} options={options2}/>
            {/*<Bar  data={data} height={400} options={options2}/>*/}
        </Column>
        <Column>
            <Bar  data={dataValueYear}  height={400} options={options}/>
            {/*<Bar data={dataPie} height={400} options={options}/>*/}

        </Column>


    </Row>)
}


export default Charts;