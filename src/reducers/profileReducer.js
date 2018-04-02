import { GET_USER_INFO, UPDATE_USER_INFO } from '../actions';

export default function profileReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload;

    case UPDATE_USER_INFO:
      return action.payload;
    default:
      return state;
  }
}
