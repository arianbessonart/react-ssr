import { combineReducers } from 'redux';

const counter = (state = 5, action) => {
  console.log(action);
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
