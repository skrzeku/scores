import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";
import AddScore from '../Scores/AddScore/AddScore';
import {changeMonth} from '../../actions/index';
import AddEmployee from "../Employees/AddEmployee/AddEmployee";

import Scores from '../Scores/Scores';

import "flatpickr/dist/themes/material_green.css";
import firebase from "../../firebase";
import Styled from "styled-components";
import Total from '../Total/Total';
import {month} from "../../reducers/month";
import Ranking from '../../components/Ranking/Ranking';




class Dashboar  extends Component {
    constructor() {
        super();
        const today = new Date().getTime();
        const currentWeek = this.props?.calendar;
        console.log(currentWeek);

    }

   MonthChangeHandler (event) {
        this.props.changeMonth(+event);
    };




    componentDidMount() {
        const today = new Date().getTime();
        const currentWeek = this.props?.calendar;



    }



    render() {

        console.log(this.props.month);





        const MyTable = Styled.table`
    // min-height: 300px;
    // border-spacing: 0;
    // border-collapse: collapse;
  `;





        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

        const db = firebase.firestore();
        console.log(this.props.user);






        const addNewScore = ()=> {
            // // shownComponent = !shownComponent;
            // // console.log(shownComponent);
            // console.log(this.state.startdates);
            // console.log(this.state.endDatess);
            //
            // const monthObject =  {
            //         id: 11,
            //         name: "Grudzień",
            //         startDate: this.state.startdates,
            //         endDate: this.state.endDatess
            //     };
            //
            // db.collection('calendar').add(monthObject).then(()=> {
            //     // dispatch({type:'ADD_SCORE', scores: allScores, score: newScore});
            // });
        };

        return(<div>
            <h1>Tablica wyników </h1>
            <h3>Obecnie zalogowany {this.props.user? this.props.user.email : 'niezalogowany'}</h3>

            <Total/>
            <AddScore/>
            <select onChange={event => this.MonthChangeHandler(event.target.value)} defaultValue={this.props.month}>
                {
                    months.map((one, index) => {
                        return (<option value={index} key={index}>{one}</option>)
                    })
                }
            </select>


            <MyTable className="table table-striped table-bordered">

                   <thead><Employees/></thead>
                    <Scores/>

            </MyTable>

            <Ranking/>
            <AddEmployee/>





        </div>)
    }
}


const mapStateToProps = state => {
    return {
        employees: state.employees,
        month: state.month,
        calendar: state.calendar,
        user: state.user
    }
};


const mapDispatchToProps = {changeMonth};


const Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboar);
export default Dashboard;