/* eslint-disable arrow-body-style */
const initialState = {
  isAuthorizationRequired: false,
};


const ActionType = {
  REQUIRED_AUTHORIZATION: 'REQUIRED_AUTHORIZATION',
};


const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return { ...state, isAuthorizationRequired: action.payload };
    default: return state;
  }
};


export {
  ActionCreator,
  ActionType,
  reducer,
};
