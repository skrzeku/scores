import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Score from './Score/Score';




const Scores = ()=> {

    //         //to run an action
    // const dispatch = useDispatch();
    // const employees = useSelector( state => state.employees);


    useEffect(()=> {






    }, []);





    // const allScores = [990, 990, 1500];

    const [scores] = useState('');

    // const mapScores = scores.map((one)=> {
    //     return(<div><Score /></div>)
    // });


    return(<div>
       <Score/>
    </div>)
};



export default Scores;