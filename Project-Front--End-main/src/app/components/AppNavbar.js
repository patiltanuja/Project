import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavbarText, NavItem, NavLink } from 'reactstrap';
//import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);

    this.state = {
      showUser: false,
      showPM: false,
      showAdmin: false,
      username: undefined,
      login: false
    };
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    if (user) {
      const roles = [];

      user.authorities.forEach(authority => {
        roles.push(authority.authority)
      });
  
      this.setState({
        showUser: roles.includes("ROLE_USER"),
        showPM: roles.includes("ROLE_PM"),
        showAdmin: roles.includes("ROLE_ADMIN"),
        login: true,
        username: user.username
      });
    }
  }

  signOut = () => {
    window.sessionStorage.setItem("auth",0)
    AuthenticationService.signOut();
    this.props.history.push('/');
    window.location.reload(); 
  }
   
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="light" dark expand="md">
      <Nav className="mr-auto">
        {this.state.showUser && <NavLink href="/profile/project-board1">Kanban</NavLink>}
        {this.state.showUser && <NavLink href="/Schedular">Schedular</NavLink>}
        {this.state.showPM && <NavLink href="/profile/project-board">Kanban</NavLink>}
        {this.state.showPM && <NavLink href="/Schedular">Schedular</NavLink>}
        {this.state.showPM && <NavLink href="/pm">Project</NavLink>}
        {this.state.showPM && <NavLink href="/create-employee">Employees</NavLink>}
        {this.state.showAdmin && <NavLink href="/profile/project-board2">Kanban</NavLink>}
        {this.state.showAdmin && <NavLink href="/Schedular">Schedular</NavLink>}
        {this.state.showAdmin && <NavLink href="/pm1">Project</NavLink>}
        {this.state.showAdmin && <NavLink href="/create-employee1">Employees</NavLink>}
        {this.state.showAdmin && <NavLink href="/admin">Users</NavLink>}

      </Nav>
      <NavbarToggler className="bg-secondary" onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        {
          this.state.login ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavbarText className="text-primary">
                    Signed in as: <a href="/profile" className="text-dark">{this.state.username}</a>
                  </NavbarText>
              </NavItem>
              <NavItem>
                <NavLink href="/" className="text-primary" onClick={this.signOut}>SignOut</NavLink>
              </NavItem>
            </Nav>                 
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/Login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">SignUp</NavLink>
              </NavItem>
            </Nav>
          )
        }
      </Collapse>
    </Navbar>;
  }
}

export default withRouter(AppNavbar);