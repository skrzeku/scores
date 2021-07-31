import React from 'react';
import {useSelector} from "react-redux";
import {navigate} from '@reach/router';
import Styled from 'styled-components';
import {colorPrimary} from "../../../variables";


const Link = Styled.a`
    transition: 0.2s all ease;
    color: black;
    cursor: pointer;
    text-decoration: none;
        &:hover {
        color: ${colorPrimary};
        }
    `;


const Employee = (props) => {

    const scoresAll = useSelector(state => state.scores);
    const month = useSelector(state => state.month);
    const calendar = useSelector(state => state.calendar[month]);
    const today = new Date();
    const weekNumber = today.getWeek();

    const employeeScore = scoresAll
        .filter(one => one.employee === props.id)
        .filter(ons => {
            const date = ons.date.seconds ? ons.date.toDate().getTime() : ons.date.getTime();
            return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();

        });


    const navigateToDetails = () => {
        navigate('/employee/' + props.id);
    };


    return (<th>
        <Link onClick={navigateToDetails}>{props.name + ' ' + props.lastName[0] + '.'}</Link>
    </th>)
};


export default Employee;