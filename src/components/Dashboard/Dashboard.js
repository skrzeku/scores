import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";
import AddScore from '../Scores/AddScore/AddScore';
import {changeMonth} from '../../actions/index';


class Dashboar  extends Component {





    render() {



        let shownComponent = false;
        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

       const MonthChangeHandler= (event)=> {
           this.props.changeMonth(+event);
        };


        const addNewScore = ()=> {
            shownComponent = !shownComponent;
            console.log(shownComponent);
        };

        return(<div>
            <h1>Tablica wyników {this.props.name}</h1>
            <Employees/>
            <AddScore/>
            <button onClick={addNewScore}>Dodaj nowy wynik:</button>
            <select onChange={event => MonthChangeHandler(event.target.value)} defaultValue={this.props.month}>
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
        employees: state.employees,
        month: state.month
    }
};


const mapDispatchToProps = {changeMonth};


const Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboar);
export default Dashboard;