import { combineReducers } from 'redux';

const step = (state = -1, action) => {
  switch (action.type) {
    case 'INCREMENT_STEP': {
      return state + action.payload;
    }
    case 'RESET': return -1;
    default:
      return state;
  }
};

const time = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_TIME': {
      return state + action.payload;
    }
    case 'RESET': return 0;
    default:
      return state;
  }
};

const mistakes = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_MISTAKES': {
      return state + action.payload;
    }
    case 'RESET': return 0;
    default:
      return state;
  }
};

const modal = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return true;
    }
    case 'CLOSE_MODAL': return false;
    default:
      return state;
  }
};

const isAuth = (state = false, action) => {
  switch (action.type) {
    case 'ISAUTH': {
      return true;
    }
    default:
      return state;
  }
};

const user = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_USER': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default combineReducers({
  step,
  mistakes,
  time,
  modal,
  isAuth,
  user,
});
