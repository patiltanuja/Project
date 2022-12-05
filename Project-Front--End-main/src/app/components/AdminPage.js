import AppNavbar from './AppNavbar';
import React, { Component } from 'react';

import BackendService from '../services/BackendService';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      content: "",
      error: "",
      employees:[],
      roles:[]
    }

    this.editEmployee=this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  componentDidMount() {

    if(window.sessionStorage.getItem("auth")!=1){
      this.props.history.push("/");
    }

    BackendService.getAdminBoard()
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

      BackendService.getEmployees().then((res)=>{
        this.setState({employees:res.data});
  });

  BackendService.getRoles().then((res)=>{
    this.setState({roles:res.data});
    });

    }

   deleteEmployee(id){
       BackendService.deleteEmployee(id).then( res => {
           this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
       });
   }

   editEmployee(id){
         this.props.history.push(`/update-employee/${id}`);
   }


   /*viewEmployee(id){
       this.props.history.push(`/view-employee/${id}`);
   }*/

  render() {
    return (
      <div>
       <AppNavbar/>
      <div>
      <h2 className="test-center">User List</h2>
      <div className="row" style={{overflowX:"auto"}}>
          <table className="table table-striped table-bordered alert alert-light">
            <thead>
                <tr>
                    <td>User Id</td>
                    <th>User First Name</th>
                    <th>User Last Name</th>
                    <th>User Mobile No</th>
                    <th>User email Id</th>
                    <th>User Role</th>
                    <th>Update</th>
                </tr>
            </thead>           
            <tbody>
                {
                    this.state.employees.map(
                        employee =>
                        <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstname}</td>
                        <td>{employee.lastname}</td>
                        <td>{employee.mobileno}</td>
                        <td>{employee.email}</td>                    
                        <td>{employee.role.name}</td>
                        <td>
                            <button onClick={() =>this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                        </td>
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
export default AdminPage;