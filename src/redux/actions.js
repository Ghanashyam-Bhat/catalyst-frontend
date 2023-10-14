// actions.js
import axios from 'axios';
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA';

export const setFilteredData = filteredData => ({
  type: SET_FILTERED_DATA,
  payload: filteredData,
});

export const fetchData = () => {
  return async (dispatch) => {
    try {
      // Perform your asynchronous operation (e.g., API request)
      const response = await axios.get('/api/data');
      // Dispatch a regular Redux action with the received data
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      // Dispatch an error action if the request fails
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
    }
  };
};

