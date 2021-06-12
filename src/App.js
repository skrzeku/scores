import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import React, {Component} from 'react';
import { connect } from "react-redux";
import { employeesFetched, fetchCalendar, fetchUser } from "./actions";
import {fetchScores} from "./actions";
import firebase, {auth} from './firebase';
import Login from './components/Login/Login';
import {Router} from '@reach/router';
import Navigation from './components/Navigation/Navigation';
import History from './components/History/History';



class App extends Component{





  componentDidMount() {

      auth.onAuthStateChanged((user)=> {
          this.props.fetchUser(user);
      });


      //get employees
      let CurrentEmployees = [];
      const db = firebase.firestore();

      db.collection('employees').get()
          .then((result) => {
             CurrentEmployees = result.docs.map(one => one.data());
              this.props.employeesFetched(CurrentEmployees)
          });


      //get scores
      let CurrentScores = [];

      db.collection('scores').orderBy('date', 'desc').get()
          .then((result) => {
        CurrentScores = result.docs.map(one => one.data());
        this.props.fetchScores(CurrentScores);
      });


      // get Calendar


      let CurrentCalendar = [];

      db.collection('calendar')
          .orderBy('id', 'asc')
          .get()
          .then((result)=> {
              CurrentCalendar = result.docs.map(one => one.data());
              this.props.fetchCalendar(CurrentCalendar);

          })
  }


    render() {
        Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(),0,1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
        };






      return (
          <div className="App">
                <Navigation/>
              <Router>
                  <Dashboard path={'/'}/>
              <Login path={'/login'}/>
              <History path={'/history'}/>

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
const mapDispatchToProps = { employeesFetched, fetchScores, fetchCalendar, fetchUser };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
