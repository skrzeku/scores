import React, {Component} from 'react';
import {connect} from "react-redux";
import Employees from "../Employees/Employees";
import AddScore from '../Scores/AddScore/AddScore';
import {addMonthObject, changeMonth} from '../../actions/index';
import Flatpickr from "react-flatpickr";
import Scores from '../Scores/Scores';

import "flatpickr/dist/themes/material_green.css";
import firebase from "../../firebase";
import Styled from "styled-components";




class Dashboar  extends Component {





    state =
        {
            startdates: 0,
            endDatess: 0
        };

    render() {

        const MyTable = Styled.table`
    // min-height: 300px;
    // border-spacing: 0;
    // border-collapse: collapse;
  `;

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

        const db = firebase.firestore();


        const MonthChangeHandler= (event)=> {
           this.props.changeMonth(+event);
        };
       let startDate;
       let endDates;

       const startDay = (e)=> {
         startDate = e;
         this.setState({startdates: e[0]});
       };
        const endDate = (e)=> {
            console.log(e[0]);
            endDates = e;
            const date = e[0].getDate();
            this.setState({endDatess: e[0]})

            // const month = MonthObject.filter((el)=> {
            //     return el.startDate <= date && el.endDate >= date;
            // });
            const month = MonthObject.find((els) => {
              return   els.startDate <= date && els.endDate >= date
            });
            // console.log(endDates[0].getDay() - startDate[0].getDay());
        };


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
            <h1>Tablica wyników {this.props.name}</h1>
            {/*<Employees/>*/}
            {/*<Scores scores={[]}/>*/}
            <AddScore/>
            {/*<button onClick={addNewScore}>Dodaj nowy wynik:</button>*/}
            <select onChange={event => MonthChangeHandler(event.target.value)} defaultValue={this.props.month}>
                {
                    months.map((one, index) => {
                        return (<option value={index} key={index}>{one}</option>)
                    })
                }
            </select>
            <Flatpickr onChange={event=> startDay(event)}/>
            <Flatpickr onChange={event=> endDate(event)}/>

            <MyTable className="table table-striped table-bordered">

                   <thead><Employees/></thead>
                    <Scores scores={[]}/>

            </MyTable>





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