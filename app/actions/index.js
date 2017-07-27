export const INCREMENT = 'INCREMENT';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';

export const increment = () => ({
  type: INCREMENT
});

export const fetchRestaurants = () => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/v1/restaurants?point=-34.9209098815918,-56.150474548339844')
      .then((response) => response.json()).then((data) => {
        console.log(data);
        dispatch(fetchRestaurantsSuccess(data));
      });
  }
};

export const fetchRestaurantsSuccess = (result) => ({
  type: FETCH_RESTAURANTS_SUCCESS,
  result,
});
