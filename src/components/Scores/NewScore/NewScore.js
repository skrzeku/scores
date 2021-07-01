import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import Styled from 'styled-components';
import {colorPrimary} from "../../../variables";
import TextField from '@material-ui/core/TextField';
// import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from "@material-ui/core";
import firebase from "../../../firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colorPrimary
        }
    },
});


const FormWrapper = Styled.div`
position: fixed;
width: 100%;
height: 100%;
left: 0;
top: 0;
background-color: rgba(0,0,0, 0.3);
transition: 0.3s all ease;
display: flex;
align-items: center;
justify-content: center;


`;

const FormTitle = Styled.div`
width: 200px;
background-color: ${colorPrimary};
color: white;
font-weight: 700;
padding: 5px 30px;
text-transform: uppercase;
`;

const SendBtn = Styled.input`
-webkit-appearance: none;
display: inline-block;
background-color: ${colorPrimary};
color: white;
padding: 10px 35px;
border: none;
position: absolute;
right: 0;
bottom: 0;
z-index: 2;
`;

const CancelBtn = Styled.a`

position: absolute;
padding: 20px;
border: none;
position: absolute;
right: 0;
top: -40px;
z-index: 2;
color: black;
text-decoration: none;
cursor: pointer;
font-size: 30px;
`;

const Form = Styled.form`
padding: 50px 50px 80px;
position: relative;

   
`;

const FormInner = Styled.div`
width: 600px;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
animation: .4s rollout;
position: relative;
`;



const NewScore = (props)=> {
    console.log(props.shownNewScore);

    const classes = useStyles();

            //Redux
    const employees = useSelector(state => state.employees);
    const allScores = useSelector(state => state.scores);

    //firebase
    const db = firebase.firestore();
    const dispatch = useDispatch();
    console.log(allScores);


    const options = ['Pozycjonowanie', 'Premium Start', 'Facebook', 'Remarketing', 'Strona WWWW', 'B2B', 'ssl', 'ads', 'Logotyp', 'Ads + Remarketing', 'Optymalizacja', 'Premium Start + Optymalizacja'];
    const shorts = ['Seo', 'S', 'Fb', 'Rem', 'www', 'b2b', 'ssl', 'ads', 'L', 'a+rem', 'o', 's+o'];


    const { register, handleSubmit, formState: {errors}, control, reset } = useForm();
    const onSubmit = (data, e) => {
        const newScore = {
            score: data.score,
            type: options[data.type],
            mailing: data.mailing,
            employee: +data.employee,
            date: data.date,
            client: data.client,
            week: data.date.getWeek(),
            short: shorts[data.type]
        };
        console.log(newScore);
        db.collection('scores').add(newScore).then(()=> {
            dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
            reset();
            props.onClose();
        });

    };
    const [startDate, setStartDate] = useState(new Date());



    return(
        <ThemeProvider theme={theme}>
            {props.shownNewScore &&
        <FormWrapper>
        <FormInner>
        <FormTitle>Dodaj wynik</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">
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
                        value={errors?.score?.rules}
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
                rules={{ required: 'true' }}
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
                        {options.map((option, index) => (
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







            <FormControlLabel className={classes.formControl}
                control={
            <Controller
            control={control}
            name= "mailing"
            defaultValue={false}


            render={({ field: {onChange, value}})=> (
                    <Checkbox
                        checked={value}
                        onChange={onChange}
                        color="primary"

                    />

                )}
            /> }
                label="mailing"/>



            <SendBtn type="submit" value="Dodaj"/>
            <CancelBtn onClick={()=>props.onClose()}><i className="las la-times"></i></CancelBtn>
        </Form>
        </FormInner>
    </FormWrapper> }
        </ThemeProvider>)
};


export default NewScore;