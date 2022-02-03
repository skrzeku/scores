import { combineReducers } from "redux";
import { employees } from "./employees";
import {scores} from "./scores";
import {month} from "./month";
import {calendar} from "./calendar";
import {user} from "./user";
import {minuses} from "./minuses";
import {year} from './year'
import {clients} from "./clients";
import {notes} from "./notes";


export default combineReducers({
    employees,
    scores,
    month,
    calendar,
    user,
    minuses,
    year,
    clients,
    notes


});