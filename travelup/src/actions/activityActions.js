import { FETCH_ACTIVITIES, RESET_ACTIVITIES } from "./types";
import {ENDPOINT, API_KEY} from "../apiConfig";

export const fetchActivities = (location_id, activity_subcategory = "0", activity_rating = "all") => dispatch => {
  // reset the restaurants before fetching new ones, this is so old values are not shown after a new search has been made
  console.log("subcategory:",activity_subcategory);
  console.log("rating:",activity_rating);
  dispatch({ type: RESET_ACTIVITIES });
  fetch(ENDPOINT+"attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&limit=30&bookable_first=false&subcategory="+activity_subcategory+"&rating="+activity_rating+"&location_id="+location_id, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    })
  .then(response => response.json())
  .then(data => dispatch({
    type: FETCH_ACTIVITIES,
    payload: data.data
  }));
}
