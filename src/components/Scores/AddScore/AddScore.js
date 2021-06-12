import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import firebase from "../../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addScore} from '../../../actions/index';
import {scores} from "../../../reducers/scores";





const AddScore = () => {

        //get states
    const employees = useSelector(state => state.employees);
    const allScores = useSelector(state => state.scores);
    const user = useSelector(state => state.user);

    //set local states
    const[score, setScore] = useState("");
    const[client, setClient] = useState("");
    const[type, setType] = useState("");
    const[mailing, setMailing] = useState(true);
    const[employee, setEmployee] = useState(employees[0]?.id);
    const [startDate, setStartDate] = useState(new Date());


        //firebase
    const db = firebase.firestore();
    const dispatch = useDispatch();


    console.log(allScores);


    useEffect(()=> {
            setEmployee(employees[0]?.id);
            setType(options[0]);
    }, [employees]);

    const addScoreHandler = (e) => {
        e.preventDefault();

        const people = user.email === 'admin@wp.pl' ? "Paweł" : "Wojtek";
        console.log(people);

        const newScore = {
          score: score,
          type: options[type],
          mailing: mailing,
          employee: +employee,
          date: new Date(startDate),
          client: client,
            week: new Date(startDate).getWeek(),
            user: people,
            short: shorts[type]

        };

        console.log(newScore);

        db.collection('scores').add(newScore).then(()=> {
            dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
        });
    };

    const options = ['Pozycjonowanie', 'Premium Start', 'Facebook', 'Remarketing', 'Strona WWWW'];
    const shorts = ['P', 'S', 'Fb', 'Rem', 'www'];
    return(<div>
        <h3>Dodawanie wyniku:</h3>
        <form>
            <input type={'number'} value={score} onChange={event => setScore(event.target.value)}/>
            <select onChange={event => setType(event.target.value)}>
                {
                    options.map((option, index) => {
                        return (
                            <option key={option} value={index}>{option}</option>
                        )
                    })
                }
            </select>
            <label>Mailing</label>
            <input type={"checkbox"} defaultChecked={mailing} onChange={() => setMailing(!mailing)}/>
            <select onChange={event => setEmployee(event.target.value)}>

                {
                    employees.map((one, index) => {
                        return (<option value={one.id} key={one.id}>{one.name + ' ' + one.lastname}</option> )
                    })
                }
            </select>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <input type={'number'} value={client} onChange={event => setClient(event.target.value)}/>
            <button onClick={addScoreHandler}>Dodaj wyniks</button>
        </form>

    </div>)

};


export default AddScore;