import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import firebase from "../../../firebase";
import Styled from "styled-components";
import {buttonWrapper, cancelBtn, colorPrimary, formWrapper, globalTitle} from "../../../variables";
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField/TextField";
import {Checkbox, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
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

const FormWrapper = Styled.div`
${formWrapper}


`;

const FormTitle = Styled.div`
${globalTitle}
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
width: 600px;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
animation: .4s rollout;
position: relative;
`;

const ButtonWrapper = Styled.div`
${buttonWrapper}
`;




const AddMinus = (props)=> {
    console.log(props);

    //get states
    const employees = useSelector(state => state.employees.filter(one => one.isActive));
    const myminuses = useSelector(state => state.minuses);
    const[employee, setEmployee] = useState(employees[0]?.id);
    const [number, setNumber] = useState(0);
    const [client, setClient] = useState('');
    const classes = useStyles();


    const { register, handleSubmit, formState: {errors}, control, watch, reset } = useForm();



    const db = firebase.firestore();
    const dispatch = useDispatch();

    const lostMonthWatcher = watch('lastMonth');
    const onSubmit = (data, e) => {
        const newMinuse = {
            minus: data.number,
            employee: +data.employee,
            date: new Date(),
            client: data.lastMonth ? data.client = 9999 : data.client
        };
        db.collection('minuses').add(newMinuse).then(()=> {
            dispatch({type:'ADD_MINUSES', minuses: myminuses, minuse: newMinuse});
            reset();
            props.onClose();
        });

    };


    const handleChange = (tags)=> {
      setNumber(tags);
      console.log(myminuses);
    };

    console.log(number);


    return(
        <React.Fragment>
        <FormWrapper>



                <FormInner>
                    <CancelBtn onClick={()=>props.onClose()}><i className="las la-times"></i></CancelBtn>

            <FormTitle>Dodaj minusa</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">


            {
                !lostMonthWatcher &&  <Controller
                    control={control}
                    name= "client"
                    defaultValue=""
                    rules={{ required: 'true', maxLength: 4}}
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
            }
            <FormControlLabel
                              control={
                                  <Controller
                                      control={control}
                                      name= "lastMonth"
                                      defaultValue={false}
                                      render={({ field: {onChange, value}})=> (
                                          <Checkbox
                                              checked={value}
                                              onChange={onChange}
                                              color="primary"
                                          />

                                      )}
                                  /> }
                              label="Z poprzedniego miesiąca"/>

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
    </FormWrapper>
        </React.Fragment>)
};



export default React.memo(AddMinus);