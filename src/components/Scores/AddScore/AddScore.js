import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import firebase from "../../../firebase";




const AddScore = () => {
    const employees = useSelector(state => state.employees);


    const[score, setScore] = useState("");
    const[type, setType] = useState("");
    const[mailing, setMailing] = useState(true);

    const db = firebase.firestore();
    const dispatch = useDispatch();

    console.log(mailing);

    const[employee, setEmployee] = useState(employees[0]?.id);


    useEffect(()=> {

            setEmployee(employees[0]?.id);
            console.log(employee);

    }, [employees]);

    const addScoreHandler = (e) => {
        e.preventDefault();

        const newScore = {
          score: score,
          type: type,
          mailing: mailing,
          employee: +employee
        };

        console.log(employee);
        // db.collection('scores').add(newScore);
    };

    const options = ['Pozycjonowanie', 'Premium Start', 'Facebook', 'Remarketing', 'Strona WWWW'];
    return(<div>
        <h3>Dodawanie wyniku:</h3>
        <form>
            <input type={'number'} value={score} onChange={event => setScore(event.target.value)}/>
            <select onChange={event => setType(event.target.value)}>
                {
                    options.map(option => {
                        return (
                            <option key={option} value={option}>{option}</option>
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
            <button onClick={addScoreHandler}>Dodaj wynik</button>
        </form>

    </div>)

};


export default AddScore;