import React, {useRef} from 'react';
import { auth } from "../../firebase";
import {Router, navigate} from '@reach/router';


const Login = ()=> {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    let user = auth.currentUser;
    // console.log(user.email);




    auth.onAuthStateChanged(authUser => {
        authUser
            ? localStorage.setItem('authUser', JSON.stringify(authUser))
            : localStorage.removeItem('authUser')
    });


    const CurrentUser = JSON.parse(localStorage.getItem('authUser'));
    console.log(JSON.parse(localStorage.getItem('authUser')));


    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value, passwordRef.current.value
        ).then(user => {
            console.log('user', user);
            navigate('/');
        }).catch(err => {
            navigate('/');
            console.log(err)
        })

    };


    const signOut =()=> {
        auth.signOut().then(()=> {
            console.log('wylogowano');
        })
    }

return(<div>
    <h3>Zaloguj</h3>
    <h4>Obecnie zalogowany: {CurrentUser? CurrentUser.email : ''}</h4>
    <form>


        <input ref={emailRef} type={"email"} placeholder={"adres email"}/>
        <input ref={passwordRef} type={"password"} placeholder={"hasło"}/>
        <button onClick={signIn}>Zaloguj</button>
        <button onClick={signOut}>Wyloguj</button>

    </form>
</div>)
};



export default Login;