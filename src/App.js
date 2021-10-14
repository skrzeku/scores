import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {employeesFetched, fetchCalendar, fetchUser, fetchMinuses} from "./actions";
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
            });

        db.collection('minuses').onSnapshot((snap) => {
            const data = snap.docs.map(doc => {
                const obj = Object.assign(doc.data(), {key: doc.id});
                return obj
            });
            this.props.fetchMinuses(data);
        });

    }


    render() {

        Date.prototype.getWeek = function () {
            var onejan = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        };

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
                    <div></div>

                    <Navigation/>
                    <Router>
                        <Dashboard path={'/'}/>
                        <Login path={'/login'} component={Login}/>
                        <History path={'/history'} component={History}/>
                        <EmployeeDetails path={'/employee/:id'} />
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
        user: state.user
    }
};
const mapDispatchToProps = {employeesFetched, fetchScores, fetchCalendar, fetchUser, fetchMinuses};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
