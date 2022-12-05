import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Container } from 'reactstrap';
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { Alert } from "react-bootstrap";
import Authentication from '../services/AuthenticationService'
import AppHeader1 from "./common/header1";
import AppFooter from "./common/footer";
import { Layout } from 'antd';


const { Header,Footer } = Layout;



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPasswordRegex = RegExp(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/i)
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class SignUp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      mobileno:"",
      password: "",
      message: "",
      successful: false,
      validForm: true,
      errors: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        mobileno:'',
        password: ''
      }
    };
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
  
    let errors = this.state.errors;
    switch (name) {
      case 'firstname':
        errors.firstname = 
          value.length < 3
            ? 'FirstName must be 3 characters long!'
            : '';
        break;
      case 'lastname':
        errors.lastname = 
          value.length < 3
            ? 'LastName must be 3 characters long!'
            : '';
        break;
      case 'username':
        errors.username = 
          value.length < 5
            ? 'Username must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
        case 'mobileno': 
        errors.mobileno = 
        value.length < 11
            ? ''
            : 'Mobileno is not valid!';
        break;
         case 'password': 
        errors.password = 
        validPasswordRegex.test(value)
            ? ''
            : 'Password must contain two uppercase letters ,one special case letter,two digits,three lowercase letters,length should be more than or equal to 8.';
        break;
      default:
        break;
    }
  
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
    })  
  }

  signUp = (e) => {
    e.preventDefault();
    const valid = validateForm(this.state.errors);
    this.setState({validForm: valid});
    if(valid){
      Authentication.register(
        this.state.firstname,
        this.state.lastname,
        this.state.username,
        this.state.email,
        this.state.mobileno,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
            toDashboard: true
           }); 
          },
        

        error => {
          console.log("Fail! Error = " + error.toString());
          
          this.setState({
            successful: false,
            message:"Please check user details"
          });
        }
      );  
    }
  }

  render() {
    if (this.state.toDashboard) {
      return <Redirect to='Login' />
    }

    const title = <h1 align="center">SIGN UP</h1>;
    const errors = this.state.errors;

    let alert = "";

    if(this.state.message){
      if(this.state.successful){
        alert = (
                  <Alert variant="success">
                    {this.state.message}
                  </Alert>
                );
      }else{
        alert = (
                  <Alert variant="danger">
                    {this.state.message}
                  </Alert>
                );
      }
    }

   

 

    return ( 
      <div id="SignUp" style={{  
        backgroundImage:"url('https://images.unsplash.com/photo-1542435503-956c469947f6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODB8fG9mZmljZSUyMGJhY2tncm91bmR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
    <Header>
      <AppHeader1/>
      </Header>
        <Container fluid className="signup-block" >
          <Row>
          <Col sm="12" md={{ size: 4, offset: 4 }}>
          {title}
            <Form onSubmit={this.signUp}>
              <FormGroup controlId="forFirstname">
                <Label className="d-flex justify-content-left alignitems-center"for="firstname" style={{fontWeight:'bold'}}>First Name</Label>
                <Input
                  type="text" 
                  placeholder="Enter First Name"
                  name="firstname" id="firstname"
                  value={this.state.firstname}
                  autoComplete="firstname"
                  onChange={this.changeHandler}
                />
                {
                  errors.firstname && ( 
                      <Alert variant="danger">
                        {errors.firstname}
                      </Alert>
                    )
                }
              </FormGroup>

              <FormGroup controlId="forLastname">
                <Label className="d-flex justify-content-left alignitems-center"
for="lastname" style={{fontWeight:'bold'}}>Last Name</Label>
                <Input
                  type="text" 
                  placeholder="Enter Last Name"
                  name="lastname" id="lastname"
                  value={this.state.lastname}
                  autoComplete="lastname"
                  onChange={this.changeHandler}
                />
                {
                  errors.lastname && ( 
                      <Alert variant="danger">
                        {errors.firstname}
                      </Alert>
                    )
                }
              </FormGroup>

              <FormGroup controlId="forUsername">
              <Label className="d-flex justify-content-left alignitems-center"
for="username" style={{fontWeight:'bold'}}>User Name</Label>
                <Input
                  type="text" 
                  placeholder="Enter UserName"
                  name="username" id="username"
                  value={this.state.username}
                  autoComplete="username"
                  onChange={this.changeHandler}
                />
                {
                  errors.username && ( 
                      <Alert variant="danger">
                        {errors.username}
                      </Alert>
                    )
                }
              </FormGroup>

              <FormGroup controlId="formEmail">
              <Label className="d-flex justify-content-left alignitems-center"
for="email" style={{fontWeight:'bold'}}>Email</Label>
                <Input required
                  type="text" 
                  placeholder="Enter Email"
                  name="email" id="email"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={this.changeHandler}
                />
                {
                  errors.email && ( 
                      <Alert variant="danger">
                        {errors.email}
                      </Alert>
                    )
                }
              </FormGroup>
               
              <FormGroup controlId="formMobileno">
              <Label className="d-flex justify-content-left alignitems-center"
for="mobileno" style={{fontWeight:'bold'}}>Mobile No</Label>
                <Input required
                  type="text" 
                  placeholder="Enter Mobile no"
                  name="mobileno" id="mobileno"
                  value={this.state.mobileno}
                  autoComplete="mobileno"
                  onChange={this.changeHandler}
                />
                {
                  errors.mobileno && ( 
                      <Alert variant="danger">
                        {errors.mobileno}
                      </Alert>
                    )
                }
              </FormGroup>
              
              <FormGroup controlId="formPassword">
              <Label className="d-flex justify-content-left alignitems-center"
for="password" style={{fontWeight:'bold'}}>Password</Label>
                <Input required 
                  type="password" 
                  placeholder="Enter Password"
                  name="password" id="password"
                  value={this.state.password}
                  autoComplete="password"
                  onChange={this.changeHandler}
                />
                {
                  errors.password && ( 
                      <Alert key="errorspassword" variant="danger">
                        {errors.password}
                      </Alert>
                    )
                }
              </FormGroup>

              <Button variant="primary" type="submit" className="btn bg-primary btn-block">
                Sign Up
              </Button>
              {
                !this.state.validForm && (
                  <Alert key="validForm" variant="danger" >
                    Please check the inputs again!
                  </Alert>
                )
              }
              {alert}
              <span className='form-input-login'>
          Already have an account? <a href='/Login'>Sign In</a>
        </span>

            </Form>
            </Col>
          </Row>
        </Container>
        <Footer>
      <AppFooter/>
      </Footer>
      </div>);
      
  }
}
export default SignUp;