import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";
import AddScore from '../Scores/AddScore/AddScore';
import {changeMonth} from '../../actions/index';
import AddEmployee from "../Employees/AddEmployee/AddEmployee";
import AddMinus from "../Minuses/AddMinus/AddMinus";
import NewScore from '../Scores/NewScore/NewScore';

import Scores from '../Scores/Scores';

import "flatpickr/dist/themes/material_green.css";
import firebase from "../../firebase";
import Styled from "styled-components";
import Total from '../Total/Total';
import {month} from "../../reducers/month";
import Ranking from '../../components/Ranking/Ranking';
import *  as colors from '../../variables';
import Details from "../Details/Details";

const MyTable = Styled.table`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    margin: 0 auto;
    width: 95%;
    border-radius: 15px;
  `;
const AddBtns = `
          background-color: ${colors.colorPrimary};
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 38px;
        text-decoration: none;
           position: absolute;
           right: 0;
        `;

const AddEmployeeBtn = Styled.a`
     
        
        top: -50px;
        ${AddBtns}
        `;

const AddScoreBtn = Styled.a`
        bottom: -50px;
        ${AddBtns}
        `;



class Dashboar  extends Component {
    constructor() {
        super();

        this.state = {
            shownform: false,
            showAddEmployeeForm: false,
            currentMinus: null,
            showselect: false
        };
        this.setCurrentMinus = this.setCurrentMinus.bind(this);
        this.MonthChangeHandler = this.MonthChangeHandler.bind(this);

    }
    shnowFormHandler() {
        this.setState({shownform: !this.state.shownform});
    }
    showAddEmployeeHandler() {
        this.setState({showAddEmployeeForm: !this.state.showAddEmployeeForm});
    }




   MonthChangeHandler (event) {
        this.props.changeMonth(+event);
        console.log(this.props.month);
        this.setState({showselect: true});
    };

    setCurrentMinus(e) {
        this.setState({currentMinus: e});
        console.log('wykonano setCurrentMinus');
        console.log(e);
        console.log(this.state.currentMinus);
    }





    componentDidMount() {
        this.MonthChangeHandler(5);
    }



    render() {






        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

        const db = firebase.firestore();
        console.log(this.props.user);
        console.log(colors.colorPrimary);

        console.log(this.props.month);
        // this.MonthChangeHandler(8);





        const showFormBtn = this.props.user ?  <AddScoreBtn onClick={this.shnowFormHandler.bind(this)}><i className="las la-file-invoice-dollar"></i></AddScoreBtn> : null;
        const addScoreWrapper = this.props.user ? (this.state.shownform && <AddScore/>) : null;
        const addMinusWrapper = this.props.user ? ( <AddMinus/>) : null;







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
            <h1>Tablica wyników {months[this.props.month] + ' ' + new Date().getFullYear()} </h1>
            <h3>Obecnie zalogowany {this.props.user? this.props.user.email : 'niezalogowany'}</h3>

            <Total/>


            {this.props.user ? (this.state.showAddEmployeeForm && <AddEmployee/>) : null}
            <MyTable className="table table-striped table-bordered">
                {this.props.user && <AddEmployeeBtn onClick={this.showAddEmployeeHandler.bind(this)}><i className="las la-user-plus"></i></AddEmployeeBtn>}
                   <thead><Employees/></thead>
                    <Scores setCurrenMinus={this.setCurrentMinus}/>
                {showFormBtn}


            </MyTable>
            <select onChange={event => this.MonthChangeHandler(event.target.value)} defaultValue={this.props.month}>
                {
                    months.map((one, index) => {
                        return (<option value={index} key={index}>{one}</option>)
                    })
                }
            </select>
            {addScoreWrapper}
            {addMinusWrapper}
            {
                // currentScore && <ScoreDetails score={currentScore} onClose={()=> setScore(null)}/> }
                this.state.currentMinus && <Details object={this.state.currentMinus} onClose={()=> this.setState({currentMinus : null})} dbName={"minuses"}/> }

            <Ranking showAll={false}/>
            <NewScore/>






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