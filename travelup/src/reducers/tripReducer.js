// Här finns reducern relevant för resor/trips.
// I vår reducer samlar vi alla möjliga typer av actions för en viss del av state.
// I detta fall är vi intresserade av trip-statet. När vi planerar en resa/trip vill vi kunna utföra olika
// handlingar/actions. Exempel är att bestämma resmål (SET_LOCATION), lägga till en aktivitet (ADD_ACTIVITY).
// Vi hanterar de möjliga actions genom ett switch-statement.
// Varje case ska returnera en uppdaterad version av state, alternativt det oförändrade statet.
// Exempel:
// action.type = ADD_ACTIVITY. Då är det aktivitets-delen av statet vi är intresserade av att ändra,
// rimligen är aktiviteter för vår resa en lista av aktivitetsobjekt. Så det nya statet bör vara en uppdaterad lista där
// den nya aktiviteten, som hittas i action.activity, läggs till de redan existerande aktiviterna, vilka hittas i 'state'.
// I SET_LOCATION är vi endast intresserade av returnera resmålet i fråga. state kanske tidigare var "London". Nu har vi kallat på
// setLocation med indata "Stockholm", varpå vi i reducern helt enkelt returnerar just "Stockholm", som hittas i action.location. "Stockholm"
// är det nya location-statet.
// Kom ihåg att varje action har en .type och en .payload. Vad payloaden/datat är beror på typen. I fallet SET_LOCATION är vår payload en plats,
// därför kallar vi den payloaden för location. I fallet ADD_ACTIVITY är payloaden ett activity-objekt, varför vi kallar payloaden för activity.


import { CREATE_TRIP, CREATE_TRIP_ERROR, ADD_RESTAURANT, RESET_TRIP, ADD_ACTIVITY, ADD_ACCOMMODATION, ADD_RESTAURANTS, ADD_ACTIVITIES, REMOVE_RESTAURANT, REMOVE_ACTIVITY } from "../actions/types";


const initState = {
  country: "", // måste ha pga databasen, kanske ändra sen
  city: "", // måste ha pga databasen, kanske ändra sen
  location: "",
  author: "",
  restaurants: [],
  activities: []
};

const tripReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_TRIP:
      // Här ska vi göra en entry i databasen.
      return state;
    case CREATE_TRIP_ERROR:
      return state;
    case ADD_RESTAURANT:
      return {
<<<<<<< HEAD
        ...state,
        restaurants: [...state.restaurants, action.restaurant]
      };
=======
          ...state,
          restaurants: [...state.restaurants, action.restaurant]
        }
    case REMOVE_RESTAURANT:
      console.log('restaurant removed')
      let restList = state.restaurants.filter(r => r.id !== action.restaurant.id)
      return {
        ...state,
        restaurants: restList
      }
>>>>>>> 21377c7af41543960f47f1f570f42a7668084765
    case ADD_ACTIVITY:
      return {
<<<<<<< HEAD
        ...state,
        activities: [...state.activities, action.activity]
      };
    case RESET_TRIP: // reset the trip
      return initState;
=======
          ...state,
          activities: [...state.activities, action.activity]
      }
    case REMOVE_ACTIVITY:
      console.log('activity removed');
      let actList = state.activities.filter(a => a.id !== action.activity.id)
      return {
        ...state,
        activities: actList
      }
    case ADD_ACCOMMODATION:
      console.log('added accommodation')
      return {
          ...state,
          accommodations: [...state.accommodations, action.accommodation]
      }
    case RESET_TRIP:  // reset the trip
      console.log("reset trip");
      return initState
    
    case ADD_RESTAURANTS:
      console.log('restaurants added');
      return {
        ...state,
        restaurants: action.payload
      }

    case ADD_ACTIVITIES:
      console.log('activities added');
      return {
        ...state,
        activities: action.payload
      }
>>>>>>> 21377c7af41543960f47f1f570f42a7668084765

    default:
      return state;
  }
};
export default tripReducer;
