import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import firebase from "../../../firebase";
import Styled from "styled-components";
import {colorPrimary} from "../../../variables";
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField/TextField";
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";



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




const AddMinus = ()=> {

    //get states
    const employees = useSelector(state => state.employees);
    const myminuses = useSelector(state => state.minuses);
    const[employee, setEmployee] = useState(employees[0]?.id);
    const [number, setNumber] = useState(0);
    const [client, setClient] = useState('');
    const classes = useStyles();


    const { register, handleSubmit, formState: {errors}, control, reset } = useForm();



    const db = firebase.firestore();
    const dispatch = useDispatch();
    const onSubmit = (data, e) => {
        const newMinuse = {
            minus: data.number,
            employee: +data.employee,
            date: new Date(),
            client: data.client
        };
        console.log(newMinuse);
        // db.collection('scores').add(newScore).then(()=> {
        //     dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
        //     reset();
        //     props.onClose();
        // });

    };


    // const addMinuses = () => {
    //
    //
    //     db.collection('minuses').add(newMinuse).then(()=> {
    //         dispatch({type:'ADD_MINUSES', minuses: myminuses, minuse: newMinuse});
    //     });
    // };

    const handleChange = (tags)=> {
      setNumber(tags);
      console.log(myminuses);
    };

    console.log(number);


    return(<FormWrapper>
        <FormInner>
            <FormTitle>Dodaj minusa</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

            <Controller
                control={control}
                name= "number"
                defaultValue=""
                rules={{ required: 'true' }}
                render={({ field: {onChange, value}})=> (
                    <TextField
                        label="Minus"
                        type="number"
                        error={!!errors.number}
                        value={errors?.number?.rules}
                        onChange={onChange}
                    />
                )}
            />

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


            <select onChange={event => setEmployee(event.target.value)}>

                {
                    employees.map((one, index) => {
                        return (<option value={one.id} key={one.id}>{one.name + ' ' + one.lastname}</option> )
                    })
                }
            </select>
            {/*<TagsInput value={number} onChange={handleChange}/>*/}
            <input type="number" onChange={event => setNumber(event.target.value)} value={number}/>
            <input type="text" onChange={event => setClient(event.target.value)} value={client}/>
        </Form>
            <SendBtn type="submit" value="Dodaj"/>
        </FormInner>
    </FormWrapper>)
};



export default AddMinus;