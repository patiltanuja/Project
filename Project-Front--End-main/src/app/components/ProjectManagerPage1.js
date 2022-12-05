import AppNavbar from './AppNavbar';
import React, { Component } from 'react';
import { Button,Input, Label} from "reactstrap";
import BackendService from '../services/BackendService';

class ProjectManagerPage1 extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      content: "",
      error: "",
      project1:[],
      projectName:""
    
    }
    this.createProject=this.createProject.bind(this);
    this.addEmployee=this.addEmployee.bind(this);
  }

  changeProjectNameHandler=(event) => {
    this.setState({projectName: event.target.value});
}

  
  createProject=(e)=>{
    e.preventDefault();
    let project={projectName: this.state.projectName};
console.log('employee =>'+JSON.stringify(project)); 
BackendService.createProject(project,this.state.projectName).then(res =>{
  this.props.history.push('/pm');
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

    BackendService.getProject().then((res)=>{
      this.setState({project1:res.data});
      console.log(res.data);
    });
  }

  addEmployee(){
    this.props.history.push('/create-employee');
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
      <h2 className="test-center">Project List</h2>
      <div className="row" style={{overflowX:"auto"}} >
          <table className="table table-striped table-bordered alert alert-light" >
            <thead>
                <tr>
                    <td>Project Id</td>
                    <th>Project Name</th>
                    <th>Team Lead Name</th>
                </tr>
            </thead>  

            <tbody>
                {
                    this.state.project1.map(
                        employee =>
                        <tr key={employee.empId}>
                        <td>{employee.projectId}</td>
                        <td>{employee.projectName}</td>
                        <td>{employee.teamLead.firstname}</td>
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

export default ProjectManagerPage1;