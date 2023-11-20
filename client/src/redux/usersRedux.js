import initialState from './initialState';


// Selectors
export const getUser = ({ user }) => user;

// Actions
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');
const SET_USER = createActionName('SET_USER');


// Action creators
export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });
export const setUser = payload => ({ type: SET_USER, payload: { ...payload, userToken: payload.access_token } });

const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

export default usersReducer;