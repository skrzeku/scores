import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import firebase from "firebase";
import Styled from 'styled-components';
import {cancelBtn, colorPrimary, formInner, formWrapper, globalTitle, sendBtn} from "../../variables";

const db = firebase.firestore();

//Styles
const ScoreInner = Styled.div`
${formInner}
`;

const ScoreWrapper = Styled.div`
${formWrapper}
`;

const RemoveBtn = Styled.button`
${sendBtn}
`;

const CancelBtn = Styled.a`
${cancelBtn}
`;

const DetailInside = Styled.div`
padding: 30px 50px 40px;
position: relative;
`;

const Title = Styled.div`
${globalTitle}
`;




const Details = (props)=> {
    //Redux
    const employees = useSelector(state => state.employees);
    const scoresAll = useSelector(state => state.scores);
    const minuses = useSelector(state => state.minuses);
    const currentEmployee = employees?.find((one)=> one.id === props.object.employee);
    const dispatch = useDispatch();
    const [endi, setEnd] = useState(false);


    const removeData = ()=> {
        const key = props.object.key;
        const scores = [...scoresAll];
        const index = props.object?.score ? scoresAll.indexOf(props.object) : minuses.indexOf(props.object);

        db.collection(props.dbName).doc(key).delete().then(() => {
            console.log("Document successfully deleted!");
            if (props.object?.score) {
                dispatch({type: 'REMOVE_SCORE', scores, index});
            }
            else {
                dispatch({type: 'REMOVE_MINUS', minuses, index});
            }
            setEnd(true);
            setTimeout(()=> {
                props.onClose();
            }, 400)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };


    const Closeit = ()=> {
        setEnd(true);
        setTimeout(()=> {
            props.onClose();
        }, 400)
    };


    return(<ScoreWrapper>
        <ScoreInner>
            <CancelBtn onClick={Closeit}><i className="las la-times"></i></CancelBtn>
            {
                props.object?.score ?  <Title>Wynik</Title> : <Title>Minus</Title>
            }

        <DetailInside>
            <p><strong>Pracownik:</strong> {currentEmployee?.name} {currentEmployee?.lastname}</p>
            {
                props.object?.score ? <p><strong>Wynik</strong> {props.object?.score}</p> : <p><strong>Minus:</strong> {props.object?.minus}</p>
            }
            <p><strong>Data:</strong> {props.object?.date.seconds ? props.object?.date.toDate().toLocaleDateString() : props.object?.date.toLocaleDateString()}</p>
            <p><strong>Nr klienta:</strong> {props.object.client}</p>
            {
                props.object?.score ? <RemoveBtn onClick={removeData}>Usuń Wynik</RemoveBtn> : <RemoveBtn onClick={removeData}>Usuń Minus</RemoveBtn>

            }


        </DetailInside>
        </ScoreInner>
    </ScoreWrapper>)
};





export default Details;