import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from "react-redux";
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

const Form = Styled.form`
padding: 50px;
   
`;

const FormInner = Styled.div`
width: 600px;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;



const NewScore = ()=> {

    const classes = useStyles();

            //Redux
    const employees = useSelector(state => state.employees);
    const allScores = useSelector(state => state.scores);


    const options = ['Pozycjonowanie', 'Premium Start', 'Facebook', 'Remarketing', 'Strona WWWW', 'B2B', 'ssl', 'ads', 'Logotyp', 'Ads + Remarketing', 'Optymalizacja', 'Premium Start + Optymalizacja'];
    const shorts = ['Seo', 'S', 'Fb', 'Rem', 'www', 'b2b', 'ssl', 'ads', 'L', 'a+rem', 'o', 's+o'];


    const { register, handleSubmit, formState: {errors}, control, reset } = useForm();
    const onSubmit = data => console.log(data);
    const [startDate, setStartDate] = useState(new Date());



    return(
        <ThemeProvider theme={theme}>
        <FormWrapper>
        <FormInner>
        <FormTitle>Dodaj wynik</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
            <Controller
                control={control}
                name= "score"
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field: {onChange, value}})=> (
                    <TextField
                        label="Wynik"
                        type="number"
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
                rules={{ required: 'Pole wymagane' }}
                render={({ field: {onChange, value}})=> (
                    <TextField
                        label="Nr klienta"
                        type="number"
                        value={value}
                        onChange={onChange}
                    />
                )}
            />


            <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <Controller
                control={control}
                name= "dates"
                defaultValue={new Date()}
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
                render={({ field: {onChange, value}})=> (
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Typ umowy</InputLabel>
                        <Select id="trinity-select" onChange={onChange} value={value} labelId="demo-simple-select-label">
                        {options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                )}
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="employeelabel">Pracownik</InputLabel>
            <Select id="trinity-select" {...register("test")} defaultValue={""} labelId="employeelabel">

                {employees.map((option, index) => (
                    <MenuItem key={index} value={option.id}>
                        {option.name + ' ' + option.lastname}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>





            {/*<select {...register("type")}>*/}
                {/*{*/}
                    {/*options.map((option, index) => {*/}
                        {/*return (*/}
                            {/*<option key={index} value={option}>{option}</option>*/}
                        {/*)*/}
                    {/*})*/}
                {/*}*/}
            {/*</select>*/}
            {/*<select {...register("employee", { required: true})} defaultValue={""}>*/}
                {/*<option value='' disabled>Wybierz pracownika</option>*/}


                {/*{*/}
                    {/*employees.map((one, index) => {*/}
                        {/*return (<option value={one.id} key={one.id}>{one.name + ' ' + one.lastname}</option> )*/}
                    {/*})*/}
                {/*}*/}
            {/*</select>*/}
            {/*<input type={"checkbox"} {...register("mailing")}/>*/}

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

                    />

                )}
            /> }
                label="mailing"/>



            <TextField
                id="outlined-number"
                label="Number"
                type="number"
            />


            {/*<Controller*/}
                {/*control={control}*/}
                {/*name= "dates"*/}
                {/*defaultValue={false}*/}
                {/*render={({ field: {onChange, value}})=> (*/}
                    {/*<TextField*/}
                        {/*label="Birthday"*/}
                        {/*type="date"*/}
                        {/*value={value}*/}
                        {/*onChange={onChange}*/}
                        {/*InputLabelProps={{*/}
                            {/*shrink: true,*/}
                        {/*}}*/}
                    {/*/>*/}
                {/*)}*/}
            {/*/>*/}


            <input type="submit" value="Dodaj"/>
        </Form>
        </FormInner>
    </FormWrapper>
        </ThemeProvider>)
};


export default NewScore;