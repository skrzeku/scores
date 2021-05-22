import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import React, {Component} from 'react';
import { connect } from "react-redux";
import { employeesFetched, fetchCalendar } from "./actions";
import {fetchScores} from "./actions";
import firebase from './firebase';

class App extends Component{



  componentDidMount() {

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

      db.collection('scores').get()
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





      return (
          <div className="App">
              <Dashboard />
          </div>
      );
  }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        scores: state.scores
    }
};
const mapDispatchToProps = { employeesFetched, fetchScores, fetchCalendar };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
