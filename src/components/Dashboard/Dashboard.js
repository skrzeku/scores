import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";
import AddScore from '../Scores/AddScore/AddScore';


class Dashboar  extends Component {





    render() {

        let shownComponent = false;
        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

       const MonthChangeHandler= (event)=> {
            console.log(event);
        };


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
            <select onChange={event => MonthChangeHandler(event.target.value)}>
                {
                    months.map((one, index) => {
                        return (<option value={index}>{one}</option>)
                    })
                }
            </select>

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