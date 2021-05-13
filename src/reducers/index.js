import { combineReducers } from "redux";
import { employees } from "./employees";
import {scores} from "./scores";

export default combineReducers({
    employees,
    scores
});