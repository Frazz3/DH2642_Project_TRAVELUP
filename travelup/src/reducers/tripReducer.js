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

import { CREATE_TRIP, CREATE_TRIP_ERROR } from "../actions/types";

//dummy data
const initState = {
  country: "Sweden",
  city: "Skellefteå",
  author: "Stina",
  restaurants: [
    {
      id: "1",
      name: "Mc Donalds",
      price: "100 sek",
      description: "Hamburger restaurant"
    }
  ]
};

const tripReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_TRIP:
      // Här ska vi göra en entry i databasen.
      console.log("created trip", action.trip);
      return state;
    case CREATE_TRIP_ERROR:
      console.log("create trip error", action.err);
      return state;
    default:
      return state;
  }
};
export default tripReducer;
