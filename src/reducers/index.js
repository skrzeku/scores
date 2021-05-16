import { combineReducers } from "redux";
import { employees } from "./employees";
import {scores} from "./scores";
import {month} from "./month";

export default combineReducers({
    employees,
    scores,
    month
});