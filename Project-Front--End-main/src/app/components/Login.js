import '../../App.css';
import React, { Component } from 'react';
//import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "reactstrap";
import {Button} from 'react-bootstrap';
import AuthenticationService from "../services/AuthenticationService";
import avatar from '../../avatar.png';
import AppHeader1 from "./common/header1";
import AppFooter from "./common/footer";
import { Layout } from 'antd';
const { Header,Footer } = Layout;

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  componentDidMount() {
    window.sessionStorage.setItem("auth",1); 
  }


  doLogin = async (event) => {
    event.preventDefault();

    AuthenticationService
        .signin(this.state.username, 
                  this.state.password)
      .then(
        () => {
          this.props.history.push('/profile');
        },
        error => {
          console.log("Login fail: error = { " + error.toString() + " }");
          this.setState({error: "Can not signin successfully ! Please check username/password again"});
        }
    );
  }

  render() {
    
    return ( 
      
        <div id="SignUp" style={{  
          backgroundImage:"url('https://images.unsplash.com/photo-1542435503-956c469947f6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODB8fG9mZmljZSUyMGJhY2tncm91bmR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'}}>
    
      
      <div className="login-block" >
        <Header>
      <AppHeader1/>
      </Header>
        <Container fluid>
          <Row style={{marginTop:"100px"}}>
          <Col lg="3"></Col>           
          <Col lg="6" lg={{ size: 4 ,offset: 1}}>
            <div className=" d-flex justify-content-center align-items-center"  style={{marginBottom: "10px"}}>
              <img src={avatar} alt="Avatar" className="avatar center" 
                style={{width: "50%", height: "auto"}}/>
            </div>
            <Form  onSubmit={this.doLogin} >
              <FormGroup>
                <Label for="username"><strong>Username</strong></Label>
                <Input autoFocus 
                  type="text"
                  name="username" id="username"
                  value={this.state.username}
                  placeholder="Enter Username"
                  autoComplete="username"
                  onChange={this.changeHandler}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password"><strong>Password</strong></Label>
                <Input type="password" 
                  name="password" id="password"
                  value={this.state.password}
                  placeholder="Enter Password"
                  autoComplete="password"
                  onChange={this.changeHandler}
                />
              </FormGroup>

              <Button type="submit" variant="primary" size="lg" block>
                Sign In
              </Button>
              {
                this.state.error && (
                  <Alert color="danger">
                    {this.state.error}
                  </Alert>
                )
              }
              <span className='form-input-login'>
         New user? <a href='/signUp'>Create an account</a>
        </span>
            </Form>
            </Col>
            <Col lg="3"></Col>
          </Row>
        </Container>
        <Footer style={{marginTop:"94px",width:"max-width"}}>
      <AppFooter/>
      </Footer>
      </div>
      </div>);

  }
}


export default Login;