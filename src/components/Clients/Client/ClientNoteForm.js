import React from 'react';
import Styled from "styled-components";
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {FormControl, InputLabel, MenuItem, Select, TextareaAutosize} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from "@material-ui/icons/Save";
import {useDispatch, useSelector} from "react-redux";
import {cancelBtn, colorPrimary, formInner, formWrapper} from "../../../variables";
import {shorts, types} from "../../../service";
import {useParams} from "@reach/router";
import firebase from "../../../firebase";
import DeleteIcon from "@material-ui/icons/Delete";

const Form = Styled.form`
padding: 50px;
position: relative;
  
    > div { 
    min-width: 220px;
    margin-right: 10px;
    margin-bottom: 10px;
    vertical-align: middle;
    }
`;
const FormWrapper = Styled.div`
${formWrapper}
`;

const FormInner = Styled.div`
${formInner}
`;
const CancelBtn = Styled.a`
${cancelBtn}
`;
const BtnWrapper = Styled.div`
margin-top: 30px;
button {
margin-left: 20px;
}
`;

const FormTitle = Styled.div`
width: 200px;
background-color: ${colorPrimary};
color: white;
font-weight: 700;
padding: 5px 30px;
text-transform: uppercase;
`;


const ClientNoteForm = (props) => {
    const {id} = useParams();

    const {register, handleSubmit, formState, control, reset} = useForm({
        defaultValues: {
            date: props.note ? props.note.date : new Date(),
            client: props.note ? props.note.id : id,
            employee: props.note ? props.note.employee : '',
            text: props.note ? props.note.text : '',
        }
    });

    const db = firebase.firestore();
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees);
    const notes = useSelector(state => state.notes);

    const onSubmit = (data, e) => {
        console.log(data);
        const newNote = {
            date: new Date(),
            client: id,
            employee: +data.employee,
            text: data.text,
        };
        props.onClose();

        if (props.note) {
            db.collection('notes').doc(props.note.key).update(newNote).then(() => {
                props.onClose();
            });
        } else {
            db.collection('notes').add(newNote).then(() => {
                // dispatch({type: 'ADD_NOTE', notes: notes, note: newNote});
                props.onClose();
            });
        }
    }

    const Removedata = ()=> {
        console.log(props.note.key);
        db.collection("notes").doc(props.note.key).delete().then(() => {
            console.log("Document successfully deleted!");
            console.log(props.note.key);
            props.onClose();

        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };


    return (<FormWrapper>
        <FormInner>
            <CancelBtn onClick={() => props.onClose()}><i className="las la-times"></i></CancelBtn>
            <FormTitle>Dodaj notatkę</FormTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="text"
                    defaultValue=""
                    rules={{required: 'true'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            label="Notatka"
                            type="text"
                            // error={!!errors.score}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="employee"
                    defaultValue={""}
                    rules={{required: 'true'}}

                    render={({field: {onChange, value}}) => (
                        <FormControl>
                            <InputLabel id="employeelabel">Pracownik</InputLabel>
                            <Select id="trinity-select" labelId="employeelabel" onChange={onChange} value={value}>

                                {employees.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>
                                        {option.name + ' ' + option.lastname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
                <BtnWrapper>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon/>}>
                        Zapisz
                    </Button>
                    {
                        props.note &&  <Button
                            variant="contained"
                            color="secondary"
                            onClick={Removedata}
                            startIcon={<DeleteIcon/>}
                        >
                            Usuń
                        </Button>
                    }
                </BtnWrapper>
            </Form>
        </FormInner>
    </FormWrapper>)

}

export default ClientNoteForm;