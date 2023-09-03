// redux/reducers/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter'; // Import your individual reducer(s) here

const rootReducer = combineReducers({
  counter: counterReducer, // Add more reducers here if needed
});

export default rootReducer;
