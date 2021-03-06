import { FETCH_LOCATION, RESET_LOCATION, EDIT_LOCATION, LOCATION_ERROR } from "../actions/types";

const intitialState = {
  id: null,
  name: null,

}

export default function plannerReducer(state = intitialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        id: action.payload, // id som fetchen returnerar
        name: action.locationName,   // location som användaren söker på
        locationPhoto: action.locationPhoto,
        locationError: false
      };

    case RESET_LOCATION:
      return {
        id: null,
        name: null,
        locationPhoto: null,
        locationError: false
      }

    case EDIT_LOCATION:
      return {
        id: action.id,
        name: action.name,
        locationPhoto: action.photo,
        locationError: false
      }
    case LOCATION_ERROR:
      return {
        ...state,
        locationError: true,
        errorMessage: action.name,
      }
    default:
      return state;
  }
}