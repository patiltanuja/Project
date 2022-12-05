import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Alert } from "react-bootstrap";

import AuthenticationService from '../services/AuthenticationService';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();
    this.setState({user: user});
  }

  render() {
    let userInfo = "";
    const user = this.state.user;

    // login
    if (user && user.accessToken) {

      let roles = "";

      user.authorities.forEach(authority => {
        roles = roles + " " + authority.authority
      });
     
    
       
      userInfo = (
          <>
          <div className="row bg-danger " style={{ height: "100%"}}>
          <div className="col-3"style={{ height: "250px" }}></div>
          <div className="col-6 d-flex flex-column justify-content-center align-items-center text-light"style={{ height: "250px" }}>
            <div style={{ fontSize: "3rem"}}>User Info</div>
            <div className="  "style={{ textAlign: "center" }}>
              
                    <ul>
                      <li  style={{ fontSize: "2rem"}}>Username: {user.username}</li>
                     
                      <li  style={{ fontSize: "2rem"}}>Authorities: {roles}</li>
                    </ul>
                    </div>
                    </div>
                  </div>
               </>  
              );
    } else { // not login
      userInfo = <div style={{marginTop:"20px"}}>
                    <Alert variant="primary">
                      <h2>Profile Component</h2>
                      <Button color="success"><Link to="/signin"><span style={{color:"white"}}>Login</span></Link></Button>
                    </Alert>
                  </div>
    }

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
        {userInfo}
        </Container>
      </div>
    );
  }
}

export default Profile;