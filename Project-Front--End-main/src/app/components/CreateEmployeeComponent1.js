import BackendService from '../services/BackendService';
import React, { Component } from 'react';
import AppNavbar from './AppNavbar';

class  CreateEmployeeComponent1 extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      content: "",
      error: "",
      employee1:[],
      projectname:"",
      useremail:""
    }
  }

  changeProjectNameHandler=(event) => {
    this.setState({projectname: event.target.value});
}

changeUserEmailHandler=(event)=>{
    this.setState({useremail: event.target.value});
}

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
        <br/>
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
export default CreateEmployeeComponent1;