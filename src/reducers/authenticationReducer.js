import { LOGIN_USER, LOGOUT_USER } from '../actions';

function init_state() {
  let initialState;
  if (localStorage.getItem('isLoggedIn') === 'false') {
    return (initialState = { isLoggedIn: false, username: '', userid: '' });
  } else {
    return (initialState = { isLoggedIn: true, username: '', userid: '' });
  }
}
export default function authenticationReducer(state = init_state(), action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.data.firstName,
        userid: action.payload.data._id,
        login_status: action.payload.status
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        userid: '',
        logout_status: action.payload.status
      };
    default:
      return state;
  }
}
