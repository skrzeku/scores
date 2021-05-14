import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

import Score from './Score/Score';




const Scores = ()=> {

    const scoresAll = useSelector(state => state.scores);


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