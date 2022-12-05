import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Alert } from "react-bootstrap"

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div style={{marginTop:"20px"}}>
            <Alert variant="primary">
              <h2>Kanban Board</h2>
              <Button color="success"><Link to="/Loginin"><span style={{color:"white"}}>Login</span></Link></Button>
            </Alert>
          </div>
        </Container>
      </div>
    );
  }
}
export default Home;