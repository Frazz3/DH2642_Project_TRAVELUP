import React from "react";
import { Checkbox, FormGroup, FormControl, FormControlLabel, InputLabel, FormLabel, Button, Select, MenuItem} from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchAcc } from "../actions/accActions"
import { addAcc } from "../actions/tripActions"

const ameneties = [{label: "Free Internet", code: "free_internet"},{label:"Free Parking", code:"free_parking"},{label:"Restaurant", code:"restaurant"},{label:"Free Breakfast",code:"free_breakfast"},{label:"Wheelchair access", code:"wheelchair_access"},{label:"Spa",code:"spa"},{label:"Bar/Lounge", code:"bar_lounge"},{label:"Fitness Center", code:"fitness_center"},{label:"Room Service",code:"room_service"},{label:"Swimming Pool",code:"swimming_pool"},{label:"Airport Transportation",code:"airport_transportation"},{label:"All",code:"all"}]

class BrowseAcc extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        free_internet:false,
        free_parking:false,
        restaurant:false,
        free_breakfast:false,
        wheelchair_access:false,
        spa:false,
        bar_lounge:false,
        fitness_center:false,
        room_service:false,
        swimming_pool:false,
        airport_transportation:false,
        all:false
    }
  }
  componentWillMount() {
    // fetches activityCategory from the location. No filtering.
    //console.log(this.props.location_id)
    this.props.fetchAcc(this.props.location_id);
  }
  
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.checked });
  };
  
  stringFunc = (name) => {
    let str = "this.state."+name
    return str
  };
  
  handleClick = () => {
    this.setState({
      loading:true
    })
  
    let amenetiesString = ""
    ameneties.map(obj=>
      {let name = obj.code;
      let stName = this.stringFunc(name);
      if(eval(stName) === true){
        amenetiesString += obj.code+",";
    };
    })
    if(amenetiesString.charAt(amenetiesString.length-1) === ","){
      amenetiesString = amenetiesString.slice(0,amenetiesString.length-1);
    }
    
    this.props.fetchAcc(this.props.location_id, amenetiesString);
  
  }

  
  addAccommodation = (acc) => {
    if (window.confirm(acc.ranking +"\n\nWould you want to add " +acc.name+ " to your trip?")){
      let act = {id:acc.location_id, name:acc.name, price:acc.price, description:acc.description, location_id:acc.location_id}
  
      // don't want to add duplicates (not sure where to put this, here or in the reducer?)
      let duplicate = false;
      let x;
      for( x of this.props.tripAccommodations){
        // we have already added that activity
        if(x.id === acc.location_id){
          console.log("ALREADY ADDED")
          duplicate = true;
          alert("You have already added this activity to your trip, choose another one please");
        }
      }
      //only add if it's not already added
      if(!duplicate){
        this.props.addAccommodation(acc);
      }
  
    }else{
      console.log('do not add');
    }
  }

  createCheckbox = (label, stateName) => {
    return(
      <FormControlLabel key={stateName}
          control={<Checkbox checked={this.state.stateName} onChange={this.handleChange} name={stateName}/>} 
          label={label}/>
    )
  }
  
  spinner = () => {
    return (
      <div className="spinner" key="spinner">
        <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>
      </div>
    )
  }

render() {
  const {auth} = this.props;
  if (!auth.uid) return <Redirect to='/' />

  if(typeof this.props.accommodations === "undefined"){
    // tills vidare, vill kanske returnera mer
    return(
      <div>
        {this.spinner()}
      </div>
    )
  }
  const accItems = this.props.accommodations.map(acc => {
  //const restaurantItems = restaurants_list.map(restaurant => {
   return ((acc.name && acc.photo )?  // kan behöva fler att filtrera på
    (
      <span key={acc.location_id}>
        <button className={acc.location_id} onClick={()=> this.addAccommodation(acc)} style={restaurantButtonStyle}>
          <h4>{acc.name} </h4>
          <img src={acc.photo.images.small.url}/>
          <h5>Price Range: {acc.price} </h5>
          {/* <p>Neighborhood: {acc.neighborhood_info.name} </p> */}
          <p>Type: {acc.subcategory_type_label}</p>
        </button>
      </span>
    
  ):null)});


  const amenetiesCheckbox = (
    <FormGroup row>
      {ameneties.map(obj =>{return this.createCheckbox(obj.label,obj.code)})}
    </FormGroup>
  );

  console.log('items', accItems)
  
  return (
    <section style={containerSection}>
      
      <div className="filters" style={filterDiv}>
        <div>
        <FormLabel component="legend">Amenities</FormLabel>
                <div>{amenetiesCheckbox}</div>
        </div>
        
        <div>
          <Button variant="outlined" onClick={this.handleClick}>
            Filter
          </Button>
          
        </div>
      </div>
      <div className="accommodations" style={restaurantDiv}>
        <h1 style={styleText}>Accommodations</h1>
        { (this.props.accommodations.length === 0)? (       // vid varje ny fetch så blir restaurants reset till [], och då kör spinner (borde gå att lösa snyggare dock...)
          <div>{this.spinner()}</div>
        ) : accItems}
      </div>
    </section>
    
  );
}
}

const styleText = {
  color: "#239160",
  padding: "10px",
  fontFamily: "Arial",
  textAlign: "center"
}

const containerSection ={
  width:"100%"
}


const filterDiv = {
  width:"150px",
  float:"left",
  border: "" + 2 + "px solid " + "#239160",
  boxShadow: "1px 1px 5px #888888",
  display: "flex",
  flexDirection: "column",
  display: "flex",
  borderRadius: 8,
}

const restaurantDiv = {
  width:"100%",
}

const restaurantButtonStyle = {
  width: "300px",
  height: "300px",
  backgroundColor: "white",
  border: "none",
  textAlign: "center",

}

BrowseAcc.propTypes = {
  fetchAcc: PropTypes.func.isRequired,
  accommodations: PropTypes.array.isRequired,
  addAccommodation: PropTypes.func.isRequired
}

const mapStateToProps = state => (
  {
  auth: state.firebase.auth,
  accommodations: state.accommodations.items,
  location_id: state.location.id,
  tripAccommodations: state.trip.accommodations
})


const mapDispatchToProps = (dispatch) => {
  return{
    //createTrip: (trip, userID) => dispatch(createTrip(trip, userID))  //createTrip is an action-creator
  }
}

export default connect(mapStateToProps, {fetchAcc, addAcc})(BrowseAcc);