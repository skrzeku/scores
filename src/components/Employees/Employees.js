import React, {useEffect} from 'react';
import Employee from './Employee/Employee';
import {useSelector} from 'react-redux'
import AddEmployee from './AddEmployee/AddEmployee';
import Styled from 'styled-components';
import firebase from "../../firebase";






const Employees = ()=> {

    const db = firebase.firestore();

    const OneEmployee = Styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


    const AllEmpls = Styled.div`
  display: flex;
  justify-content: space-between;
`;
    let allScores = [];

  useEffect(()=> {
      db.collection('scores').get()
          .then((result) => {
              allScores = result.docs.map(one => one.data());
              getEmployeeScores(0);
          });
  }, [allScores]);

  const getEmployeeScores = (id)=> {

  [...allScores].filter(one => {
   return   one.employee === id});
  };


    const employees = useSelector(state => state.employees);

    const AllEmployees = employees.map((one)=> {
        console.log(one);
        return(<OneEmployee><Employee name={one.name} key={one.id} lastName={one.lastname} scores={getEmployeeScores(one.id)}/></OneEmployee>)
    });

    return(<div>

        <h2>Pracownicy:</h2>
       <AllEmpls>
        {AllEmployees}
       </AllEmpls>
       <AddEmployee/>

    </div>)
};





export default Employees;