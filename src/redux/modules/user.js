const SET_USER = 'user/SET_USER';

const defaultState = {
  email: ''
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER: {
      const email = action.data.email;
      return Object.assign({}, state, { email });
    }
    default: return state;
  }
}

export function setUser(data) {
  return {
    type: SET_USER,
    data
  };
}
