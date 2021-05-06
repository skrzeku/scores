import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";


class Dashboar  extends Component {



    render() {

        console.log(this.props.employees);
        return(<div>
            <h1>Tablica wyników {this.props.name}</h1>
            <Employees/>
        </div>)
    }
}


const mapStateToProps = state => {
    return {
        employees: state.employees
    }
};


const Dashboard = connect(mapStateToProps)(Dashboar);
export default Dashboard;