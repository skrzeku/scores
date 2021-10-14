import React from 'react';
import {Doughnut} from "react-chartjs-2";
import {useSelector} from "react-redux";
import Styled from "styled-components";
import { Bar } from 'react-chartjs-2';

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


const Charts = (props)=> {

    const scoresAll = useSelector(state => state.scores);
    const employees = useSelector(state => state.employees);
    const storeMonth = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar);

    const types = ['Pozycjonowanie', 'Premium Start', 'Facebook', 'Remarketing', 'Strona WWW', 'B2B', 'ssl', 'ads', 'Logotyp', 'Ads + Remarketing', 'Optymalizacja', 'Premium Start + Optymalizacja', 'reCaptcha', 'GMF', 'GMF + Opinie', 'Opinie','Instagram', 'inny'];
    const currentMonth = useSelector(state => state.calendar[props.month]);

    const filterbyDate = (one, bool)=>  scoresAll
        .filter((ons)=> ons.type === one)
        .filter((ont) => {
            if (bool) {
                const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
                return date >= currentMonth?.startDate.toDate().getTime() && date <= currentMonth?.endDate.toDate().getTime();
            }
            else return ont;
        })
        .map((oni)=>oni.type).length;


    // test?
    const testscores = scoresAll
        .filter(ont => {
            const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
            return date >= currentMonth?.startDate.toDate().getTime() && date <= currentMonth?.endDate.toDate().getTime();
        }).map((score)=>score.type);
    let counts = {};


   testscores.forEach((x)=> counts[x] = (counts[x] || 0)+1);
   console.log(testscores.sort());
    const countss = testscores.reduce((acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1
    }), {});
    console.log(countss);
    // console.log(countss.sort((a,b) => b[1] - a[1]));

    console.log(Object.entries(countss).sort(([,a],[,b]) => b-a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {}));
    const result = testscores.reduce((a, c) => a.set(c, (a.get(c) || 0) + 1), new Map());

    console.log(result);



    const mapofLennght = types.map((one)=> {
        let obj = {
            name: one,
            value: 0
        };
        const filteredscores = filterbyDate(one, true);
        console.log(countss);


        obj.name = one;
        obj.value = filteredscores;
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
        const filteredscores = filterbyDate(one, false);

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
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
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



    // console.log(kindOfScores);




    return(<Row>
        <Row>
            <Column><Label>{currentMonth.name} {new Date().getFullYear()}</Label></Column>
            <Column><Label>Rok {new Date().getFullYear()}</Label></Column>
        </Row>
        <Column>
            <Bar  data={data} height={400} options={options2}/>
        </Column>
        <Column>
            <Bar  data={data2}  height={400} options={options}/>
        </Column>
        <span>siema</span>

    </Row>)
}


export default Charts;