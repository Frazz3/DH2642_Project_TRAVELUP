import React from "react"
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import 'typeface-roboto';
import { connect } from "react-redux";
import { lnk_style } from '../assets/style'

const Navbar = (props) => {
  const {auth} = props;
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;
  return (
    <nav class="navbar navbar-expand-md navbar-dark teal darken-2">
      <a class="navbar-brand" href="/">TravelUp</a>
        {links}
    </nav>


  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
    
}


export default connect(mapStateToProps)(Navbar);