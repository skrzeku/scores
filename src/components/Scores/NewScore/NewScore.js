import React, {useState, useEffect} from 'react';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import Styled from 'styled-components';
import {buttonWrapper, cancelBtn, colorPrimary, formInner, formWrapper, sendBtn} from "../../../variables";
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
import Button from "@material-ui/core/Button/Button";
import SaveIcon from '@material-ui/icons/Save';


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
${formWrapper}
`;

const FormTitle = Styled.div`
width: 200px;
background-color: ${colorPrimary};
color: white;
font-weight: 700;
padding: 5px 30px;
text-transform: uppercase;
`;
const ButtonWrapper = Styled.div`
${buttonWrapper}
`;

const SendBtn = Styled.input`
${sendBtn}
`;

const CancelBtn = Styled.a`

${cancelBtn}
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

const FormInner = Styled.div`
${formInner}
`;



const NewScore = (props)=> {

    const classes = useStyles();
    console.log(props);

            //Redux
    const employees = useSelector(state => state.employees);
    const allScores = useSelector(state => state.scores);

    //firebase
    const db = firebase.firestore();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState, formState: {errors, isSubmitSuccessful}, control, reset } = useForm();






    const options = ['Pozycjonowanie', 'Premium Start', 'Facebook', 'Remarketing', 'Strona WWWW', 'B2B', 'ssl', 'ads', 'Logotyp', 'Ads + Remarketing', 'Optymalizacja', 'Premium Start + Optymalizacja', 'reCaptcha', 'inny'];
    const shorts = ['Seo', 'S', 'Fb', 'Rem', 'www', 'b2b', 'ssl', 'ads', 'L', 'a+rem', 'o', 's+o', 'rc', ' '];


    const onSubmit = (data, e) => {
        console.log(e);
        const newScore = {
            score: data.score,
            type: options[data.type],
            mailing: data.mailing ? data.mailing : false,
            employee: +data.employee,
            date: data.date ? data.date : new Date(),
            client: data.client,
            week: data.date.getWeek(),
            short: shorts[data.type]
        };
        db.collection('scores').add(newScore).then(()=> {
            console.log(newScore);
            console.log(data);
            // dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
            // reset();
            props.onClose();
        });

    };
    const [startDate, setStartDate] = useState(new Date());

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
        <ThemeProvider theme={theme}>
            {props.shownNewScore &&
        <FormWrapper>
        <FormInner>
            <CancelBtn onClick={()=>props.onClose()}><i className="las la-times"></i></CancelBtn>

            <FormTitle>Dodaj wynik</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off" >
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

            <Controller
            control={control}
            name= "mailing"
            render={({ field: {onChange, value}})=> (
                <FormControlLabel className={classes.formControl}
                                  control={
                    <Checkbox
                        onChange={onChange} value={value}
                        color="primary"
                    />}
                                  label="mailing"/>

                )}
            />




            {/*<SendBtn type="submit" value="Dodaj"/>*/}

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
    </FormWrapper> }
        </ThemeProvider>)
};


export default NewScore;