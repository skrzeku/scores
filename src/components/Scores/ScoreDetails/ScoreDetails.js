import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import firebase from "../../../firebase";
import Styled from 'styled-components';
import {colorPrimary} from "../../../variables";
import { useTransition, animated } from 'react-spring';


//Styles
const ScoreWrapper = Styled.div`
border: solid 2px ${colorPrimary};
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
animation: .4s rollout;
background-color: white;
padding: 30px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const ScoreDetails = (props)=> {

    let score = props?.score;
    const employees = useSelector(state => state.employees);
    const scoresAll = useSelector(state => state.scores);
    const currentEmployee = employees?.find((one)=> one.id === score?.employee);
    const dispatch = useDispatch();
    const db = firebase.firestore();





    const hideComponent = ()=> {
      score = [];
    };

    const removeData = ()=> {
        const key = score.key;
        const scores = [...scoresAll];
        const index = scoresAll.indexOf(score);

        db.collection("scores").doc(key).delete().then(() => {
            // dispatch({type: 'REMOVE_SCORE', scores, index});
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };

    return(<ScoreWrapper>
        <h2>Wynik</h2>
        <div>

            <p>Pracownik: {currentEmployee?.name} {currentEmployee?.lastname}</p>
                {
                    score?.score ? <p>Wynik {score?.score}</p> : <p>Minus: {score?.minus}</p>
                }
            <p>Data: {score?.date.toDate().toLocaleDateString()}</p>
            <p>Nr klienta: {score?.client}</p>
            <button onClick={removeData}>Usuń Wynik</button>
            <button onClick={props.onClose}>Anuluj</button>

        </div>
    </ScoreWrapper>)
};



export default ScoreDetails;