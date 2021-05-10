import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import React, {Component} from 'react';
import { connect } from "react-redux";
import { employeesFetched } from "./actions";
import firebase from './firebase';

class App extends Component{



  componentDidMount() {
      let CurrentEmployees = [];
      const db = firebase.firestore();

      db.collection('employees').get()
          .then((result) => {
             CurrentEmployees = result.docs.map(one => one.data());
              this.props.employeesFetched(CurrentEmployees)
          });
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
        employees: state.employees
    }
};
const mapDispatchToProps = { employeesFetched };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
