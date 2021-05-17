import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import firebase from '../../../firebase';




const AddEmployee = ()=> {

    const[name, setName] = useState("");
    const[lastName, setLastName] = useState("");
    const db = firebase.firestore();
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees);


    const addNewEmployee = ()=> {
        const ids = employees.map(one => {
            return one.id
        });

        const maxID = employees
            .map(one => one.id)
            .reduce((a, b) => {return (a > b) ? a: b });



        const newEmployee = {
            name: name,
            lastname: lastName,
            id: maxID + 1
        };

        console.log(newEmployee);

        // db.collection('employees').add(newEmployee)
        //     .then(()=> {
        //         dispatch({type: 'ADD_EMPLOYEE', employees: employees, employee: newEmployee});
        //     });
    };


    return (<div>
        <h2>Dodaj nowego pracownika</h2>
        <form>
            <input type={"text"} placeholder={"Imię"} onChange={event => setName(event.target.value)}/>
            <input type={"text"} placeholder={"Nazwisko"} onChange={event => setLastName(event.target.value)}/>
        </form>
        <button onClick={addNewEmployee}>dodaj</button>
    </div>)
};



export default AddEmployee;