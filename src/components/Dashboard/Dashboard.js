import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";
import AddScore from '../Scores/AddScore/AddScore';


class Dashboar  extends Component {


    render() {

        let shownComponent = false;


        const addNewScore = ()=> {
            shownComponent = !shownComponent;
            console.log(shownComponent);
        };


        console.log(this.props.employees);
        return(<div>
            <h1>Tablica wyników {this.props.name}</h1>
            <Employees/>
            <AddScore/>
            <button onClick={addNewScore}>Dodaj nowy wynik:</button>

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