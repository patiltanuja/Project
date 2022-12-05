import BackendService from '../services/BackendService';
import React, { Component } from 'react';
import { Button,Input, Label} from "reactstrap";
import AppNavbar from './AppNavbar';

class  CreateEmployeeComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      content: "",
      error: "",
      employee1:[],
      projectname:"",
      useremail:""
    }
    this.createEmployee=this.createEmployee.bind(this);
  }

  changeProjectNameHandler=(event) => {
    this.setState({projectname: event.target.value});
}

changeUserEmailHandler=(event)=>{
    this.setState({useremail: event.target.value});
}

  createEmployee=(e)=>{
    e.preventDefault();
    let employee={projectname: this.state.projectname,useremail: this.state.useremail};
    console.log('employee =>'+JSON.stringify(employee)); 
    BackendService.createEmployee(employee,this.state.projectname,this.state.useremail).then(res =>{
      this.props.history.push('/create-employee');
      window.location.reload(false);
  }
  );}

  componentDidMount() {

    if(window.sessionStorage.getItem("auth")!=1){
      this.props.history.push("/");
    }

    BackendService.getPmBoard()
    .then( response => {
      this.setState({
        content: response.data
      })
    } , error => {
      console.log(error);
      this.setState({
        error: error.toString()
      }); 
    });

    BackendService.getEmployee().then((res)=>{
      this.setState({employee1:res.data});
      console.log(res.data);
    });
  }

  /*createProject(){
    this.props.history.push();
}*/


  render() {
    return (
      <div>
        <AppNavbar/>
        <div>
        <div className = "card col-md-4 offset-md-4 alert alert-primary" style={{marginTop:"3%"}}>                    
        <div className = "card-body alert alert-primary">
        <form>
                <Label><h6>Enter Project Name</h6></Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter Project Name"
                  value={this.state.projectname}
                  onChange={this.changeProjectNameHandler}
                />
                <Label><h6>Enter User Email ID</h6></Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter user email id"
                  value={this.state.useremail}
                  onChange={this.changeUserEmailHandler}
                />
                <br/>
              <Button variant="primary" onClick={this.createEmployee} type="submit" className="btn bg-primary btn-block mt-4">
                Add Employee
              </Button>
        </form>
        </div>
        </div>
    </div>

    <div>
      <h2 className="test-center">Employee List</h2>
      <div className="row" style={{overflowX:"auto"}}>
          <table className="table table-striped table-bordered alert alert-light">
            <thead>
                <tr>
                    <td>Employee Id</td>
                    <th>Project Name</th>
                    <th>Team Lead Name</th>
                    <th>Employee Name</th>
                </tr>
            </thead>  

            <tbody>
                {
                    this.state.employee1.map(
                        employee =>
                        <tr key={employee.empId}>
                        <td>{employee.empId}</td>
                        <td>{employee.project.projectName}</td>
                        <td>{employee.teamLead.firstname}</td>
                        <td>{employee.user.firstname}</td>
                    </tr>
                    )
                }
            </tbody>
          </table>
      </div>
      </div>
    </div>
    );
  }
}
export default CreateEmployeeComponent;