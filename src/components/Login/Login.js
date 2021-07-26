import React, {useRef, useState} from 'react';
import { auth } from "../../firebase";
import {Router, navigate} from '@reach/router';
import {useDispatch, useSelector} from 'react-redux'
import {user} from "../../reducers/user";
import {Controller, useForm} from "react-hook-form";
import Button from "@material-ui/core/Button/Button";
import SaveIcon from '@material-ui/icons/Save';
import TextField from "@material-ui/core/TextField/TextField";
import Styled from "styled-components";
import {buttonWrapper, tabName} from "../../variables";


const Form = Styled.form`
padding: 50px;
position: relative;
    > div { 
    min-width: 220px;
    margin-right: 10px;
    vertical-align: middle;
    }
`;

const TabName = Styled.h2`
${tabName}
`;


const ButtonWrapper = Styled.div`
${buttonWrapper}
`;



const Login = ()=> {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [user, setUser] = useState('');
    const Loggeduser = useSelector(state => state.user);

    const { register, handleSubmit, formState: {errors}, control, reset } = useForm();




    const dispatch = useDispatch();

    auth.onAuthStateChanged((use)=> {
       setUser(use);
    });







    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value, passwordRef.current.value
        ).then(user => {
            console.log('user', user);
            // setUser(user);
            dispatch({type:'FETCH_USER', user: user});

            navigate('/');
        }).catch(err => {
            // navigate('/');
            console.log(err)
        })

    };


    const signOut =()=> {
        auth.signOut().then(()=> {
            navigate('/');
            dispatch({type:'FETCH_USER', user: []});

            console.log('wylogowano');
        })
    };

return(<div>
    <TabName><span>Logowanie</span></TabName>
    {/*<h4>Obecnie zalogowany: {CurrentUser? CurrentUser.email : ''}</h4>*/}
    {
        Loggeduser ?
            <div><h5>Obecnie zalogowany: {Loggeduser.email}</h5>
                <ButtonWrapper>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={signOut}
                        startIcon={<SaveIcon />}
                    >
                        Wyloguj
                    </Button>
                </ButtonWrapper>
            </div>

            : <Form>

            <TextField
                label="adres email"
                type="email"
                inputRef={emailRef}
            />

            <TextField
                label="hasło"
                type="password"
                inputRef={passwordRef}
            />


            <ButtonWrapper>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={signIn}
                    startIcon={<SaveIcon />}
                >
                    Zaloguj
                </Button>
            </ButtonWrapper>
        </Form>
    }




</div>)
};



export default Login;