import { combineReducers } from "redux";
import { employees } from "./employees";
import {scores} from "./scores";
import {month} from "./month";
import {calendar} from "./calendar";

export default combineReducers({
    employees,
    scores,
    month,
    calendar
});