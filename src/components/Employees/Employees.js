import React, {useEffect} from 'react';
import Employee from './Employee/Employee';
import { useDispatch, useSelector} from 'react-redux'

import firebase from '../../firebase';





const Employees = (props)=> {

    const db = firebase.firestore();


    const dispatch = useDispatch();


    useEffect(() => {

        db.collection('employees').get().then((employees)=> {
            console.log(employees.docs.map((one)=> {
                console.log(one.data());
            }));
        });

    }, []);



    const employees = useSelector(state => state.employees);









    const AllEmployees = employees.map((one)=> {
        return(<div><Employee key={one.name} name={one.name} /></div>)
    });


    const addNewEmployee = ()=> {
        const oneEmployee = {
            name: '2denis',
            scores: [992, 990]
        };
        const ref = db.collection('employees').add({employee: oneEmployee});


        // dispatch({type: 'ADD_EMPLOYEE', employees: employees, employee: oneEmployee});



    };















    return(<div>
        <h2>Pracownicy:</h2>
       {AllEmployees}
       <button onClick={addNewEmployee}>dodaj</button>
    </div>)
};
//
// const mapDispatchToProps = { AddEmployee };
//
// const mapStateToProps = state => {
//     return {
//         allEmployees: state.employees
//     }
// };




export default Employees;