import { combineReducers } from 'redux';
import {
  FETCH_PROJECTS,
  DELETE_PROJECT,
  CREATE_USER,
  PROJECT_DETAIL,
  USER_BID
} from '../actions';
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './authenticationReducer';
import profileReducer from './profileReducer';

function projects(state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload;
    case PROJECT_DETAIL:
      return action.payload;
    case DELETE_PROJECT:
      return action.payload;
    case CREATE_USER:
      return action.payload;
    case USER_BID:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  profileReducer,
  projects,
  authenticationReducer,
  form: formReducer
});
