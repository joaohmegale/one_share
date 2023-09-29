
import { createStore } from 'redux';

const logState = {
  isLoggedIn: !!localStorage.getItem('accessToken'),
  id: 0,
  username: "",
};

function reducer(state = logState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, id: action.id, username: localStorage.getItem('infosUser') };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, id: 0, username: "" };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
