import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sessionReducer from '../reducers/session';


export const store = configureStore({
  reducer: {
    session: sessionReducer,
    entities:
      combineReducers({

      })
  }
});

