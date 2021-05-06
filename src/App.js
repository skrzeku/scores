import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import React, {Component} from 'react';
import { connect } from "react-redux";
import { employeesFetched } from "./actions";

class App extends Component{

  componentDidMount() {
      const CurrentEmployees = [
          {
              name: 'Pawel'
          },
          {
              name: 'Lol',
          }
      ];


      this.props.employeesFetched(CurrentEmployees);

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
