import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Score from './Score/Score';




const Scores = ()=> {

            //to run an action
    const dispatch = useDispatch();
    const employees = useSelector( state => state.employees);


    useEffect(()=> {






    }, []);

    const addnewEmploy = ()=> {
        const newEmploy = {
            name: 'siemano'
        };
        console.log(employees);
        dispatch({type: 'ADD_EMPLOYEE', employees: employees, employee: newEmploy});

    };




    const allScores = [990, 990, 1500];

    const [scores] = useState(allScores);

    const mapScores = scores.map((one)=> {
        return(<div><Score key={one} score={one} /></div>)
    });


    return(<div>
        {mapScores}
        <button onClick={addnewEmploy}>addnewb Employee</button>
    </div>)
};



export default Scores;