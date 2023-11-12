import initialState from './initialState';

// Selectors
export const getUser = ({ user }) => user; 

// Actions
const createActionName = actionName => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

// Action creators
export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });

const usersReducer = (state = initialState.users, action) => {
  console.log('Action:', action);
  switch (action.type) {
    case LOG_IN:
      console.log('Logging in:', action.payload);
      return action.payload;
    case LOG_OUT:
      console.log('Logging out');
      return null;
    default:
      return state;
  }
};

export default usersReducer;