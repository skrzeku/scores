import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import firebase from "firebase";
import Styled from 'styled-components';
import {cancelBtn, colorPrimary, formInner, formWrapper, globalTitle, sendBtn} from "../../variables";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import FormScore from "../Scores/FormScore/FormScore";


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
background-color: #FF0000;
    i {
    font-size: 24px;
    margin-left: 10px;
    }
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

const FormWrapper = Styled.div`
animation: 1s showform;
margin-top: 15px;
`;

const BtnWrapper = Styled.div`
button {
margin: 0 10px;
}
`;




const Details = (props) => {
    //Redux
    const employees = useSelector(state => state.employees);
    const scoresAll = useSelector(state => state.scores);
    const minuses = useSelector(state => state.minuses);
    const user = useSelector(state => state.user);
    const currentEmployee = employees?.find((one) => one.id === props.object.employee);
    const dispatch = useDispatch();
    const [endi, setEnd] = useState(false);
    const [shownForm, showFormHandler] = useState(false);



    const removeData = () => {
        const key = props.object.key;
        const scores = [...scoresAll];
        const index = props.object?.score ? scoresAll.indexOf(props.object) : minuses.indexOf(props.object);

        db.collection(props.dbName).doc(key).delete().then(() => {
            console.log("Document successfully deleted!");
            if (props.object?.score) {
                dispatch({type: 'REMOVE_SCORE', scores, index});
            } else {
                dispatch({type: 'REMOVE_MINUS', minuses, index});
            }
            setEnd(true);
            setTimeout(() => {
                props.onClose();
            }, 400)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };


    const Closeit = () => {
        setEnd(true);
        setTimeout(() => {
            props.onClose();
        }, 400)
    };




    return (<ScoreWrapper>
        <ScoreInner>
            <CancelBtn onClick={Closeit}><i className="las la-times"></i></CancelBtn>
            {
                props.object?.score ? <Title>Wynik</Title> : <Title>Minus</Title>
            }

            <DetailInside>
                <p><strong>Pracownik:</strong> {currentEmployee?.name} {currentEmployee?.lastname}</p>
                {
                    props.object?.score ? <p><strong>Wynik</strong> {props.object?.score}</p>:
                        <p><strong>Minus:</strong> {props.object?.minus}</p>

                }
                {
                    props.object?.score && <p><strong>Typ</strong> {props.object?.type}</p>
                }
                <p>
                    <strong>Data:</strong> {props.object?.date.seconds ? props.object?.date.toDate().toLocaleDateString() : props.object?.date.toLocaleDateString()}
                </p>
                <p><strong>Nr
                    klienta:</strong> {props.object.client == 9999 ? 'Za poprzedni miesiąc' : props.object.client}</p>

                {
                    user &&
                    (<BtnWrapper>
                        {
                            !shownForm &&
                            <Button
                            variant="contained"
                            color="primary"
                            /* eslint-disable-next-line react/style-prop-object */
                            // onClick={removeData}
                            onClick={()=>showFormHandler(!shownForm)}
                            startIcon={<EditIcon/>}
                            >
                            Edycja
                            </Button>

                        }
                            <Button
                        variant="contained"
                        color="secondary"
                        onClick={removeData}
                        startIcon={<DeleteIcon/>}
                    >
                        Usuń
                    </Button>
                        </BtnWrapper>

                    )
                }
                <div>

                </div>




            </DetailInside>
            {
                shownForm && <FormWrapper><FormScore object={props.object} onClose={()=>props.onClose()}/></FormWrapper>

            }
        </ScoreInner>
    </ScoreWrapper>)
};


export default Details;