import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";
import AddScore from '../Scores/AddScore/AddScore';
import {changeMonth} from '../../actions/index';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";




class Dashboar  extends Component {



    render() {


        const MonthObject = [
            {
                id: 0,
                name: "Styczeń",
                startDate: 0,
                endDate: 4
            },
            {
                id: 1,
                name: "Luty",
                startDate: 5,
                endDate: 10
            },
            {
                id: 4,
                name: 'Maj',
                startDate: 1619388000000,
                endDate: 1621893600000
            }
        ];



        let shownComponent = false;
        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

       const MonthChangeHandler= (event)=> {
           this.props.changeMonth(+event);
        };
       let startDate;
       let endDates;

       const startDay = (e)=> {
         startDate = e;
       };
        const endDate = (e)=> {
            console.log(e[0]);
            endDates = e;
            const date = e[0].getDate();
            console.log(e[0]);

            // const month = MonthObject.filter((el)=> {
            //     return el.startDate <= date && el.endDate >= date;
            // });
            const month = MonthObject.find((els) => {
              return   els.startDate <= date && els.endDate >= date
            });
            // console.log(endDates[0].getDay() - startDate[0].getDay());
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
                        return (<option value={index} key={index}>{one}</option>)
                    })
                }
            </select>
            <Flatpickr onChange={event=> startDay(event)}/>
            <Flatpickr onChange={event=> endDate(event)}/>


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