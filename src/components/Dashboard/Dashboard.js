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
import {
    Select,
    MenuItem,
} from "@material-ui/core";

const MyTable = Styled.table`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    position: relative;
    margin: 0 auto;
    width: 95%;
    border-radius: 15px;
    table-layout: fixed;
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

const AddMinuBtn = Styled.a`
${AddBtns}
        left: 0;
        bottom: -50px;
`;


const SelectWrapper = Styled.div`
text-align: left;
width: 95%;
margin: 0 auto;
input, div {
min-width: 130px;
}
`;



class Dashboar  extends Component {
    constructor() {
        super();

        this.state = {
            shownform: false,
            showAddEmployeeForm: false,
            currentMinus: null,
            currentScore: null,
            showselect: false,
            showminusform: false
        };
        this.setCurrentMinus = this.setCurrentMinus.bind(this);
        this.setCurrentScore = this.setCurrentScore.bind(this);
        this.MonthChangeHandler = this.MonthChangeHandler.bind(this);
        this.showMinusFormHandler = this.showMinusFormHandler.bind(this);

    }
    shnowFormHandler() {
        this.setState({shownform: !this.state.shownform});
    }
    showMinusFormHandler() {
        this.setState({showminusform: !this.state.showminusform});
        console.log(this.state.showminusform);
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
    }

    setCurrentScore(e) {
        this.setState({currentScore: e});
    }





    componentDidMount() {
        // const date = ont.date.seconds ? ont.date.toDate().getTime() : ont.date.getTime();
        //         // return date >= calendar?.startDate.toDate().getTime() && date <= calendar?.endDate.toDate().getTime();
        //
        //
        //
        //         this.MonthChangeHandler(5);
        const today = new Date();
        const currMonth = this.props.calendar?.find((one)=> {
            const date = today.getTime() >= one.startDate.toDate().getTime() && today.getTime() <= one.endDate.toDate().getTime();
            console.log(date);
            return date;
        });
        // console.log(this.props.calendar);

    }



    render() {





        // this.MonthChangeHandler(currMonth.id);

        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

        const db = firebase.firestore();
        console.log(this.props.user);
        console.log(colors.colorPrimary);

        console.log(this.props.month);
        console.log(this.props.calendar);
        // this.MonthChangeHandler(8);





        const showFormBtn = this.props.user ?  <AddScoreBtn onClick={this.shnowFormHandler.bind(this)}><i className="las la-file-invoice-dollar"></i></AddScoreBtn> : null;
        const showMinusFormBtn = this.props.user ?  <AddMinuBtn onClick={this.showMinusFormHandler.bind(this)}><i className="las la-minus-circle"></i></AddMinuBtn> : null;
        const addScoreWrapper = this.props.user ? (this.state.shownform && <AddScore/>) : null;
        const addMinusWrapper = this.props.user ? (this.state.showminusform && <AddMinus/>) : null;







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
            <SelectWrapper>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={this.props.month}
                    value={this.props.month}
                    onChange={event => this.MonthChangeHandler(event.target.value)}
                >
                    {months.map((option, index) => (
                        <MenuItem key={index} value={index}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </SelectWrapper>

            <Total/>
            <div>

            </div>


            <MyTable className="table table-striped table-bordered">
                {this.props.user && <AddEmployeeBtn onClick={this.showAddEmployeeHandler.bind(this)}><i className="las la-user-plus"></i></AddEmployeeBtn>}
                   <thead><Employees/></thead>
                    <Scores setCurrenMinus={this.setCurrentMinus} setCurrentScore={this.setCurrentScore}/>
                {showFormBtn}
                {showMinusFormBtn}



            </MyTable>

            {
                // currentScore && <ScoreDetails score={currentScore} onClose={()=> setScore(null)}/> }
                this.state.currentMinus && <Details object={this.state.currentMinus} onClose={()=> this.setState({currentMinus : null})} dbName={"minuses"}/> }

            {
                // currentScore && <ScoreDetails score={currentScore} onClose={()=> setScore(null)}/> }
                this.state.currentScore && <Details object={this.state.currentScore} onClose={()=> this.setState({currentScore : null})} dbName={"scores"}/> }

            <Ranking showAll={false}/>
            <NewScore shownNewScore={this.state.shownform} onClose={()=> this.shnowFormHandler()}/>
            <AddMinus showminusForm={this.state.showminusform} onClose={()=> this.showMinusFormHandler() }/>
            <AddEmployee showemployeeform={this.state.showAddEmployeeForm} onClose={()=> this.showAddEmployeeHandler()}/>







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