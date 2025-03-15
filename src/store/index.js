import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profiles: profileReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);



export default store;
