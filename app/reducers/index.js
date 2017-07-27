import { combineReducers } from 'redux';
// export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
// export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';


const counter = (state = 5, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

const restaurants = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_RESTAURANTS_SUCCESS':
      return action.result.data;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter,
  restaurants,
});

export default rootReducer;
