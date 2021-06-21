import React from "react";
import {useDispatch, useSelector} from "react-redux";
import firebase from "firebase";
import Styled from 'styled-components';
import {colorPrimary} from "../../variables";

const db = firebase.firestore();

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




const Details = (props)=> {
    //Redux
    const employees = useSelector(state => state.employees);
    const scoresAll = useSelector(state => state.scores);
    const currentEmployee = employees?.find((one)=> one.id === props.object.employee);
    const dispatch = useDispatch();

    const removeData = ()=> {
        const key = props.object.key;
        const scores = [...scoresAll];
        const index = scoresAll.indexOf(props.object);

        db.collection(props.dbName).doc(key).delete().then(() => {
            console.log("Document successfully deleted!");
            dispatch({type: 'REMOVE_SCORE', scores, index});
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };


    return(<ScoreWrapper>
        <h2>Wynik</h2>
        <div>

            <p>Pracownik: {currentEmployee?.name} {currentEmployee?.lastname}</p>
            {
                props.object?.score ? <p>Wynik {props.object?.score}</p> : <p>Minus: {props.object?.minus}</p>
            }
            <p>Data: {props.object.date.toDate().toLocaleDateString()}</p>
            <p>Nr klienta: {props.object.client}</p>
            <button onClick={removeData}>Usuń Wynik</button>
            <button onClick={props.onClose}>Anuluj</button>

        </div>
    </ScoreWrapper>)
};





export default Details;