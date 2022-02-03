import React, {useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from "@material-ui/icons/Save";
import Styled from "styled-components";
import firebase from "../../../firebase";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {buttonWrapper, colorPrimary} from "../../../variables";
import {types, shorts, months} from "../../../service";


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

const ButtonWrapper = Styled.div`
${buttonWrapper}
`;


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            // margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 220,
    },
    checkbox: {
        width: 100,
        minWidth: 100
    }
}));




const FormScore = (props)=> {

    console.log(props.object);
    console.log(useSelector(state => state.year));


    const { register, handleSubmit, formState, formState: {errors, isSubmitSuccessful}, control, reset } = useForm({
        defaultValues: {
            score: props.object ? props.object.score : '',
            client: props.object ? props.object.client : '',
            date: props.object ? props.object.date.toDate() : new Date(),
            type: props.object ? types.indexOf(props.object.type) : '',
            employee: props.object ? props.object.employee : '',
            mailing: props.object ? props.mailing : false,
            newClient: props.object ? props.newClient: false
        }
    });








    const db = firebase.firestore();
    const classes = useStyles();


    const employees = useSelector(state => state.employees);
    const allScores = useSelector(state => state.scores);



    const onSubmit = (data, e) => {
        const newScore = {
            score: data.score,
            type: types[data.type],
            mailing: data.mailing ? data.mailing : false,
            employee: +data.employee,
            date: data.date ? data.date : new Date(),
            client: data.client,
            week: data.date.getWeek(),
            short: shorts[data.type],
            newClient: data.newClient ? data.newClient : false
        };
        // console.log(newScore);

        if (props.object) {
            console.log(props.object.key);


            db.collection('scores').doc(props.object.key).update(newScore).then(()=> {
                // console.log(newScore);
                // console.log(data);
                // dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
                // reset();

                props.onClose();
            });
        }
        else {
            db.collection('scores').add(newScore).then(()=> {
                console.log(newScore);
                console.log(data);
                // dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
                // reset();

                props.onClose();
            });
        }

        // db.collection('scores').add(newScore).then(()=> {
        //     console.log(newScore);
        //     console.log(data);
        //     // dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
        //     // reset();
        //     props.onClose();
        // });

    };

    useEffect(()=> {
        if (formState.isSubmitSuccessful) {
            reset({
                score: '',
                client: '',
                date: new Date(),
                type: '',
                employee: '',
                mailing: false,
            });
        }

    }, [formState, reset]);


    return(
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className={classes.root} >
            <Controller
                control={control}
                name= "score"
                defaultValue=""
                rules={{ required: 'true' }}
                render={({ field: {onChange, value}})=> (
                    <TextField
                        label="Wynik"
                        type="number"
                        error={!!errors.score}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            {/*<input {...register("score", {required: true})} type="number"/>*/}
            {/*{errors.score && <div>"First name is required"</div>}*/}

            <Controller
                control={control}
                name= "client"
                defaultValue=""
                rules={{ required: 'true', maxLength: 4 }}
                render={({ field: {onChange, value}})=> (
                    <TextField
                        label="Nr klienta"
                        type="number"
                        error={!!errors.client}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />


            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <Controller
                    control={control}
                    name= "date"
                    defaultValue={new Date()}
                    rules={{ required: 'true' }}
                    render={({ field: {onChange, value}})=> (
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            autoOk
                            error={!!errors.date}
                            label={"Data"}
                            format="dd/MM/yyyy"
                            value={value}
                            onChange={onChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date"
                            }}
                        />
                    )}
                />
            </MuiPickersUtilsProvider>
            <Controller
                control={control}
                name= "type"
                defaultValue={""}
                rules={{ required: 'true' }}
                render={({ field: {onChange, value}})=> (
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Typ umowy</InputLabel>
                        <Select id="trinity-select" onChange={onChange} value={value} labelId="demo-simple-select-label" error={!!errors.type}>
                            {types.map((option, index) => (
                                <MenuItem key={index} value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                control={control}
                name= "employee"
                defaultValue={""}
                rules={{ required: 'true' }}

                render={({ field: {onChange, value}})=> (
                    <FormControl className={classes.formControl}>
                        <InputLabel id="employeelabel">Pracownik</InputLabel>
                        <Select id="trinity-select" labelId="employeelabel" onChange={onChange} value={value} error={!!errors.employee}>

                            {employees.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                    {option.name + ' ' + option.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                control={control}
                name= "mailing"
                defaultValue={props.object ? props.object.mailing : false}

                render={({ field: {onChange, value}})=> (
                    <FormControlLabel
                        control={

                            <Checkbox
                                onChange={onChange} value={value}
                                checked={value}
                                color="primary"
                            />}
                        label="mailing"
                        // defaultValue={props.object.mailing}
                    />

                )}
            />
            <Controller
                control={control}
                name= "newClient"
                defaultValue={props.object ? props.object.newClient : false}
                render={({ field: {onChange, checked, value}})=> (
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultValue={value}
                                onChange={onChange} value={value}
                                checked={value}
                                color="primary"
                            />}
                        label="Nowy klient"/>

                )}
            />




            {/*<SendBtn type="submit" value="Dodaj"/>*/}

            <ButtonWrapper>
                {
                    props.object ?  <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                    >
                        Zapisz
                    </Button> :
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                        >
                            Dodaj
                        </Button>
                }



            </ButtonWrapper>

        </Form>
    )
}




export default FormScore;