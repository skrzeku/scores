import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import React, {Component, useEffect} from 'react';
import {connect} from "react-redux";
import {
    employeesFetched,
    fetchCalendar,
    fetchUser,
    fetchMinuses,
    changeMonth,
    clientsFetched,
    fetchNotes
} from "./actions";
import {fetchScores} from "./actions";
import firebase, {auth} from './firebase';
import Login from './components/Login/Login';
import {Router} from '@reach/router';
import Navigation from './components/Navigation/Navigation';
import History from './components/History/History';
import EmployeeDetails from './components/Employees/EmployeeDetails/EmployeeDetails';
import Logo from './assets/images/logo.png';
import Ranking from './components/Ranking/Ranking';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {colorPrimary} from "./variables";
import Stats from "./components/Stats/Stats";
import {months} from "./service";
import Clients from "./components/Clients/Clients";
import {data} from './datas';
import Client from "./components/Clients/Client/Client";



export const changeCurrentMonth = (calendar, changeVoid)=> {
    const today = new Date();
    const currMonth = calendar?.find((one) => {
        const date = today.getTime() >= one.startDate?.toDate().getTime() && today.getTime() <= one.endDate?.toDate().getTime();
        return date;
    });

    if (currMonth) {
        console.log(currMonth);
       const lol = months.indexOf(
            months.find((one, index)=> {
                return one === currMonth.name
            })
        )



        changeVoid( months.indexOf(
            months.find((one, index)=> {
                return one === currMonth.name
            })
        ));
        // console.log(changeVoid(currMonth?.id));
        // console.log(this.props.month);
        return false;

    }
}

class App extends Component {


    constructor() {

        super();
        this.state = {
            loading: false
        }


    }



    componentDidMount() {



        auth.onAuthStateChanged((user) => {
            this.props.fetchUser(user);
        });
        const db = firebase.firestore();

        console.log(data);
        this.props.clientsFetched(data.Clients);





        //get employees
        let CurrentEmployees = [];

        db.collection('employees').orderBy('seat', 'asc').onSnapshot((snap) => {
            const data = snap.docs.map(doc => {
                const obj = Object.assign(doc.data(), {key: doc.id});
                return obj
            });
            this.props.employeesFetched(data);
            // this.setState({loading: true});
        });

        db.collection('scores').orderBy('date', 'asc').onSnapshot((snap) => {
            const data = snap.docs.map(doc => {
                const obj = Object.assign(doc.data(), {key: doc.id});
                return obj
            });
            this.props.fetchScores(data);
            this.setState({loading: true});

        });


        // get Calendar
        let CurrentCalendar = [];

        db.collection('calendar')
            .orderBy('id', 'asc')
            .get()
            .then((result) => {
                CurrentCalendar = result.docs.map(one => {
                    return one.data()
                });
                this.props.fetchCalendar(CurrentCalendar);
                changeCurrentMonth(this.props.calendar, this.props.changeMonth);
                // console.log(this.props.month);


            });

        db.collection('minuses').onSnapshot((snap) => {
            const data = snap.docs.map(doc => {
                const obj = Object.assign(doc.data(), {key: doc.id});
                return obj
            });
            this.props.fetchMinuses(data);
        });

            db.collection('notes').onSnapshot((snap) => {
                const data = snap.docs.map(doc => {
                    const obj = Object.assign(doc.data(), {key: doc.id});
                    return obj
                });
                console.log(data);
                this.props.fetchNotes(data);
            });






    }
    componentWillMount() {

    }

    // componentWillMount() {
    //     const today = new Date();
    //     const currMonth = this.props.calendar?.find((one) => {
    //         const date = today.getTime() >= one.startDate?.toDate().getTime() && today.getTime() <= one.endDate?.toDate().getTime();
    //         return date;
    //     });
    //     console.log(currMonth?.id);
    //     if (currMonth) {
    //         changeMonth(currMonth?.id);
    //         return false;
    //     }
    // }






    render() {
        // console.log(changeCurrentMonth(this.props.calendar, this.props.changeMonth));

        Date.prototype.getWeek = function () {
            var onejan = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        };
        // const today = new Date();
        // const currMonth = this.props?.calendar?.find((one) => {
        //     const date = today.getTime() >= one.startDate?.toDate().getTime() && today.getTime() <= one.endDate?.toDate().getTime();
        //     return date;
        // });
        // console.log(currMonth);
        // if (currMonth) {
        //     this.props.changeMonth(currMonth?.id);
        // }
        //



        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: colorPrimary
                }
            },
        });


        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    {
                        !this.state.loading ? <div className="Spinner">
                                <img className="App-logo" src={Logo}/>
                            </div> :
                            null
                    }

                    <Navigation/>
                    <Router>
                        <Dashboard path={'/'} default/>
                        <Login path={'/login'} component={Login}/>
                        <History path={'/history'} component={History}/>
                        <EmployeeDetails path={'/employee/:id'} />
                        <Clients path={'/clients'} />
                        <Client path={'/client/:id'} />
                        <Ranking path={'/ranking'} showAll={true} component={Ranking}/>
                        <Stats path={'/stats'} component={Stats}/>

                    </Router>
                </ThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        scores: state.scores,
        user: state.user,
        calendar: state.calendar,
        month: state.month,
        clients: state.clients
    }
};
const mapDispatchToProps = {employeesFetched, fetchScores, fetchCalendar, fetchUser, fetchMinuses, changeMonth, clientsFetched, fetchNotes};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
