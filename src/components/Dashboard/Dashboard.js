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
import {colorPrimary} from "../../variables";
import {tabName} from "../../variables";
import {Table} from "../../variables";

const TableWrapper = Styled.div`
// height: 600px;
// overflow: auto;
`;

const MyTable = Styled.table`
   ${Table};
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
           position: relative;
           z-index: 10;
           right: 0;
           transition: 0.2s all ease;
            &:hover {
            color: ${colorPrimary};
            background-color: white;
            }
        `;

const AddEmployeeBtn = Styled.a`
        
        top: 0px;
        ${AddBtns}
        `;

const AddScoreBtn = Styled.a`
        // bottom: -50px;
        ${AddBtns}
        `;

const AddMinuBtn = Styled.a`
${AddBtns}
        left: 0;
        // bottom: -50px;
`;


const SelectWrapper = Styled.div`
text-align: left;
width: 95%;
margin: 0 auto;
position: absolute;
line-height: 70px;
left: 15px;
z-index: 10;
input, div {
min-width: 120px;
}
`;

const BtnsWrapper = Styled.div`
display: flex;
justify-content: center;
    a {
    margin: 10px;
    }
`;

const TabName = Styled.h2`
${tabName}
`;


class Dashboar extends Component {
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

    }

    shnowFormHandler = () => {
        this.setState({shownform: !this.state.shownform});
    };

    showMinusFormHandler = () => {
        this.setState({showminusform: !this.state.showminusform});
    };

    showAddEmployeeHandler() {
        this.setState({showAddEmployeeForm: !this.state.showAddEmployeeForm});
    }


    MonthChangeHandler = (event) => {
        this.props.changeMonth(+event);
        this.setState({showselect: true});
    };

    setCurrentMinus = (e) => {
        this.setState({currentMinus: e});
    };

    setCurrentScore = (e) => {
        this.setState({currentScore: e});
    };


    componentDidMount() {
        const today = new Date();
        const currMonth = this.props.calendar?.find((one) => {
            const date = today.getTime() >= one.startDate.toDate().getTime() && today.getTime() <= one.endDate.toDate().getTime();
            return date;
        });

    }


    render() {

        const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        const db = firebase.firestore();

        const showFormBtn = this.props.user ? <AddScoreBtn onClick={this.shnowFormHandler}><i
            className="las la-file-invoice-dollar"></i></AddScoreBtn> : null;
        const showMinusFormBtn = this.props.user ?
            <AddMinuBtn onClick={this.showMinusFormHandler}><i className="las la-minus-circle"></i></AddMinuBtn> : null;
        const addScoreWrapper = this.props.user ? (this.state.shownform && <AddScore/>) : null;
        const addMinusWrapper = this.props.user ? (this.state.showminusform && <AddMinus/>) : null;


        return (<div>
            <TabName><span>Wyniki</span></TabName>
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
            <TableWrapper>

            <MyTable className="table table-striped table-bordered">

                <thead>
                    <tr><Employees/></tr>
               </thead>
                <Scores setCurrenMinus={this.setCurrentMinus} setCurrentScore={this.setCurrentScore}/>

            </MyTable>

            </TableWrapper>
            <BtnsWrapper>
                {this.props.user && <AddEmployeeBtn onClick={this.showAddEmployeeHandler.bind(this)}><i
                    className="las la-user-plus"></i></AddEmployeeBtn>}
                {showFormBtn}
                {showMinusFormBtn}
            </BtnsWrapper>


            {
                this.state.currentMinus &&
                <Details object={this.state.currentMinus} onClose={() => this.setState({currentMinus: null})}
                         dbName={"minuses"}/>}

            {
                this.state.currentScore &&
                <Details object={this.state.currentScore} onClose={() => this.setState({currentScore: null})}
                         dbName={"scores"}/>}

            <Ranking month={this.props.month} showAll={false}/>
            <NewScore shownNewScore={this.state.shownform} onClose={() => this.shnowFormHandler()}/>
            <AddMinus showminusForm={this.state.showminusform} onClose={() => this.showMinusFormHandler()}/>
            <AddEmployee showemployeeform={this.state.showAddEmployeeForm}
                         onClose={() => this.showAddEmployeeHandler()}/>
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