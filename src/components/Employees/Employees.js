import React from 'react';
import Employee from './Employee/Employee';
import {useSelector} from 'react-redux'
import AddEmployee from './AddEmployee/AddEmployee';
import Styled from 'styled-components';
import firebase from "../../firebase";
import {fetchScores} from "../../actions/index";






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



  const getEmployeeScores = (id)=> {

      console.log(allScores.filter(ons=>ons.employee === id));
      return  allScores?.filter(one => one.employee === id);
  };




    const employees = useSelector(state => state.employees);
    const scoresAll = useSelector(state => state.scores);


    const AllEmployees = employees.map((one, index)=> {
        let employeeScore = [...scoresAll]
            .filter(ons=>ons.employee === one.id);


        return(<Employee name={one.name}  lastName={one.lastname} id={one.id} key={index}/>)
    });

    return(<div>

        <h2>Pracownicy:</h2>
       <AllEmpls>
        {AllEmployees}
       </AllEmpls>
        <button onClick={()=> getEmployeeScores(4)}>pokaż</button>
       <AddEmployee/>

    </div>)
};





export default Employees;