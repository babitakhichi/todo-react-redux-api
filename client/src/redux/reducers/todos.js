import {
  FETCH_DATA_ERROR, FETCH_DATA_SUCCESS, FETCH_DATA_REQUEST

} from "../actions/actions.types";

const initalState = {
  loading: false,
  item: [],
  error: null
};

const todos = (state = initalState, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        item: action.item
      };
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        item: []
      };

    default:
      return state;
  }
};

export default todos;
