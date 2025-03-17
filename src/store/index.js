import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

import postReducer from './postReducer'; 

const rootReducer = combineReducers({
  auth: authReducer,
  profiles: profileReducer,
  posts: postReducer, 
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);



export default store;
