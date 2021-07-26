import React, {useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import firebase from '../../../firebase';
import TextField from "@material-ui/core/TextField/TextField";

import Styled from 'styled-components';
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import {buttonWrapper, cancelBtn, colorPrimary, formInner, formWrapper, globalTitle, sendBtn} from "../../../variables";
import {Controller, useForm} from "react-hook-form";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from '@material-ui/icons/Save';






const FormWrapper = Styled.div`
${formWrapper}
`;
const FormInner = Styled.div`
${formInner}
`;
const SendBtn = Styled.input`

`;

const CancelBtn = Styled.a`
${cancelBtn}
`;
const FormTitle = Styled.div`
${globalTitle}
`;

const Form = Styled.form`
padding: 50px;
position: relative;
    > div { 
    min-width: 220px;
    margin-right: 10px;
    vertical-align: middle;
    }
`;

const ButtonWrapper = Styled.div`
${buttonWrapper}
`;


const AddEmployee = (props)=> {
    console.log(props);

    const[name, setName] = useState("");
    const[lastName, setLastName] = useState("");
    const db = firebase.firestore();
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees);
    const { register, handleSubmit, formState: {errors}, control, reset } = useForm();

    const onSubmit = (data, e) => {
        const maxID = employees
            .map(one => one.id)
            .reduce((a, b) => {return (a > b) ? a: b }, 0);
        const newEmployee = {
            name: data.name,
            lastname: data.lastName,
            id: maxID + 1
        };
        console.log(data);
        db.collection('employees').add(newEmployee).then(()=> {
            dispatch({type: 'ADD_EMPLOYEE', employees: employees, employee: newEmployee});
            reset();
            props.onClose();
        });

    };


    const addNewEmployee = ()=> {
        const ids = employees.map(one => {
            return one.id
        });

        const maxID = employees
            .map(one => one.id)
            .reduce((a, b) => {return (a > b) ? a: b });


        const newEmployee = {
            name: name,
            lastname: lastName,
            id: maxID + 1
        };

        console.log(newEmployee);

        db.collection('employees').add(newEmployee)
            .then(()=> {
                dispatch({type: 'ADD_EMPLOYEE', employees: employees, employee: newEmployee});
            }).then(()=> {
                setLastName("");
                setName("")
        });
    };


    return (
        <React.Fragment>
            {props.showemployeeform &&
            <FormWrapper>
                <FormInner>
                    <CancelBtn onClick={() => props.onClose()}><i className="las la-times"></i></CancelBtn>
                    <FormTitle>Dodaj Pracownika</FormTitle>
                    <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue=""
                            rules={{required: 'true'}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Imię"
                                    type="text"
                                    error={!!errors.name}
                                    value={errors?.name?.rules}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="lastName"
                            defaultValue=""
                            rules={{required: 'true'}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Nazwisko"
                                    type="text"
                                    error={!!errors.lastName}
                                    value={errors?.lastName?.rules}
                                    onChange={onChange}
                                />
                            )}
                        />


                        <ButtonWrapper>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                            >
                                Dodaj
                            </Button>
                        </ButtonWrapper>
                    </Form>

                </FormInner>
            </FormWrapper>
            }
        </React.Fragment>
                )
};



export default AddEmployee;