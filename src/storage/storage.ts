import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dayReducer, weekReducer } from './reducer';

const reducer = combineReducers({
  day: dayReducer,
  week: weekReducer
});

export const storage = configureStore({
  reducer: reducer
})