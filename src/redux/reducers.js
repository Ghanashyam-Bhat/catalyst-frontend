// reducers.js
import { SET_FILTERED_DATA } from './actions';

const initialState = {
  filteredData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
