import { createStore } from 'redux';
import reducers from './reducers';


//     scores: [],
// const initialState = {
//     employees: [],
//     month: 0
// };

export const store = createStore(reducers);