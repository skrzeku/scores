import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import React, {Component} from 'react';
import { connect } from "react-redux";
import { employeesFetched, fetchCalendar, fetchUser, fetchMinuses } from "./actions";
import {fetchScores} from "./actions";
import firebase, {auth} from './firebase';
import Login from './components/Login/Login';
import {Router} from '@reach/router';
import Navigation from './components/Navigation/Navigation';
import History from './components/History/History';
import EmployeeDetails from './components/Employees/EmployeeDetails/EmployeeDetails';
import Logo from './assets/images/logo.png';



class App extends Component{

   constructor() {

       super();
       this.state = {
           loading: false
   }
   }






  componentDidMount() {

      auth.onAuthStateChanged((user)=> {
          this.props.fetchUser(user);
      });
      const db = firebase.firestore();


      //get employees
      let CurrentEmployees = [];


      db.collection('employees').get()
          .then((result) => {
             CurrentEmployees = result.docs.map(one => one.data());
              this.props.employeesFetched(CurrentEmployees)
          });


      //get scores
      let CurrentScores = [];

      db.collection('scores').orderBy('date', 'desc').get()
          .then((result) => {

        CurrentScores = result.docs.map(one => {
            const obj = Object.assign(one.data(), {key : one.id});
            return obj
        });

        this.props.fetchScores(CurrentScores);
        this.setState({loading: true});
      });










      // get Calendar
      let CurrentCalendar = [];

      db.collection('calendar')
          .orderBy('id', 'asc')
          .get()
          .then((result)=> {
              CurrentCalendar = result.docs.map(one => {
                  console.log(one.data());
                  return one.data()
              });
              this.props.fetchCalendar(CurrentCalendar);
          });

      //get Minuses
      let Minuses = [];
      db.collection('minuses')
          .get()
          .then((result) => {
              Minuses = result.docs.map(one => {
                  const obj = Object.assign(one.data(), {key : one.id});
                  return obj
              });
              this.props.fetchMinuses(Minuses);
          });
  }


    render() {
        Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(),0,1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
        };






      return (
          <div className="App">
              {
                  !this.state.loading ?   <div className="Spinner">
                      <img className="App-logo" src={Logo}/>
                  </div> :
                      null
              }

                <Navigation/>
              <Router>
                  <Dashboard path={'/'}/>
              <Login path={'/login'}/>
              <History path={'/history'}/>
                  <EmployeeDetails path={'/employee/:id'}/>

              </Router>
          </div>
      );
  }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        scores: state.scores,
        user: state.user
    }
};
const mapDispatchToProps = { employeesFetched, fetchScores, fetchCalendar, fetchUser, fetchMinuses };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
