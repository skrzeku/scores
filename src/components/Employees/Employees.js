import React, {useEffect} from 'react';
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

  useEffect(()=> {
      let CurrentScores = [];
      db.collection('scores').get()
          .then((result) => {
              allScores = result.docs.map(one => one.data());
              fetchScores(CurrentScores);
              console.log(allScores);
          });
  }, [allScores]);

  const getEmployeeScores = (id)=> {

      console.log(allScores.filter(ons=>ons.employee === id));
      return  allScores?.filter(one => one.employee === id);
  };

  const checkit = (id)=> {
      console.log(getEmployeeScores(id));
  };


    const employees = useSelector(state => state.employees);

    const AllEmployees = employees?.map((one)=> {
        let scoress = allScores?.filter(ons=> ons.employee === 4);
        console.log(scoress);
        return(<OneEmployee><Employee name={one.name} key={one.id} lastName={one.lastname} id={one.id}/></OneEmployee>)
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