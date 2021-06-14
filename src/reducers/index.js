import { combineReducers } from "redux";
import { employees } from "./employees";
import {scores} from "./scores";
import {month} from "./month";
import {calendar} from "./calendar";
import {user} from "./user";
import {minuses} from "./minuses";

export default combineReducers({
    employees,
    scores,
    month,
    calendar,
    user,
    minuses
});