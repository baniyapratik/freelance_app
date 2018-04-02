import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const USER_BID = 'USER_BID';
export const PROJECT_DETAIL = 'PROJECT_DETAIL';
export const HIRE_USER = 'HIRE_USER';
export const GET_USER_INFO = 'GET_USER_INFO';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const getUserInfo = values => async dispatch => {
  const res = await axios.get(`/api/getUserInfo/${values.userid}`);
  console.log(res);
  dispatch({ type: GET_USER_INFO, payload: res.data });
};
export const updateUserInfo = values => async dispatch => {
  const req = await axios.post(`/api/updateUserInfo/${values.userid}`, values);
  dispatch({ type: UPDATE_USER_INFO, payload: req });
};

export const hireUser = values => async dispatch => {
  console.log(values.userId);
  const req = await axios.post(
    `/api/projectDetail/projectId/${values.projectId}/userId/${values.userId}`
  );
  dispatch({ type: HIRE_USER, payload: req });
};
export const getProjectDetail = values => async dispatch => {
  try {
    console.log('is it  though?');
    console.log(values);
    const res = await axios.get(`/api/projectDetail/${values}`);
    dispatch({ type: PROJECT_DETAIL, payload: res.data });
  } catch (err) {
    dispatch({ type: PROJECT_DETAIL, payload: err.message });
  }
};
export const fetchProjects = () => async dispatch => {
  const res = await axios.get('/api/getProjects');
  console.log(res);
  dispatch({ type: FETCH_PROJECTS, payload: res.data });
};

export const createProject = values => async dispatch => {
  const req = await axios.post('/api/createProject', values);

  dispatch({ type: CREATE_PROJECT, payload: req });
};

export const deleteProject = values => async dispatch => {
  const req = await axios.post('/api/deleteProject', values);

  dispatch({ type: DELETE_PROJECT, payload: req });
};

export const createUser = values => async dispatch => {
  let req = '';
  try {
    req = await axios.post('/api/createUser', values);
    return req.status;
  } catch (err) {
    console.log('Status is' + err.response.status);
    console.log(err.response.data);
  }
};
export const logoutUser = values => async dispatch => {
  let req = await axios.get('/api/logout');

  dispatch({ type: LOGOUT_USER, payload: req });
};

export const loginUser = values => async dispatch => {
  try {
    let req = await axios.post('/api/login', values);
    dispatch({ type: LOGIN_USER, payload: req });
  } catch (err) {
    dispatch({ type: LOGIN_USER, payload: err.response });
  }
};

export const userBid = values => async dispatch => {
  let req = await axios.post('/api/userbid', values);
  dispatch({ type: USER_BID, payload: req });
};
