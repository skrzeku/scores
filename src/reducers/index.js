import { combineReducers } from "redux";
import { employees } from "./employees";
import {scores} from "./scores";
import {month} from "./month";
import {calendar} from "./calendar";
import {user} from "./user";

export default combineReducers({
    employees,
    scores,
    month,
    calendar,
    user
});