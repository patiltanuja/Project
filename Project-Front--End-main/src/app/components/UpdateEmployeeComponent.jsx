import React, { Component } from 'react';
import BackendService from '../services/BackendService';

class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={  
            id: this.props.match.params.id,
         firstname:'',
         lastname:'',
         username:'',
         mobileno:'',
         email:'',
         role:''
        }
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeUserNameHandler=this.changeUserNameHandler.bind(this);
        this.changeMobileNoHandler=this.changeMobileNoHandler.bind(this);
        this.changeRoleHandler=this.changeRoleHandler.bind(this);
        this.updateEmployee=this.updateEmployee.bind(this);
 
    }

    componentDidMount(){

        if(window.sessionStorage.getItem("auth")!=1){
            this.props.history.push("/");
          }      

        BackendService.getEmployeeById(this.state.id).then((res)=>{
            let employee=res.data;
            this.setState({firstname: employee.firstname,lastname: employee.lastname,username: employee.username,
                mobileno: employee.mobileno,email: employee.email,role:employee.role.name});
        });
    }
    
    updateEmployee = (e) =>{
        e.preventDefault();
        let employee={ firstname: this.state.firstname, lastname: this.state.lastname,
                      username: this.state.username, mobileno: this.state.mobileno,email: this.state.email
                     , role:this.state.role};
        console.log('employee =>'+JSON.stringify(employee));   
        BackendService.updateEmployee(employee,this.state.id).then(res =>{
            this.props.history.push('/admin');
        });
        
    }

    changeFirstNameHandler=(event) => {
        this.setState({firstname: event.target.value});
    }

    changeLastNameHandler=(event) => {
        this.setState({lastname: event.target.value});
    }
 
    changeUserNameHandler=(event) => {
        this.setState({username: event.target.value});
    }
 
    changeMobileNoHandler=(event) => {
     this.setState({mobileno: event.target.value});
     }
     changeEmailHandler=(event) => {
     this.setState({email: event.target.value});
     }

     changeRoleHandler=(event) =>{
        this.setState({role: event.target.value});
    }

     cancel(){
       this.props.history.push('/admin');
     }
 
     render() {
         return(
             <div>
                 <div className="container">
                     <div className="row">
                         <div className="card col-md-6 offset-md-3 offset-md-3">
                           <h3 className="text-center">Update Employee</h3>
                            <div className="card body">
                                <form>
                                   <div className="form-group">
                                      <label>First Name:</label>
                                      <input placeholder="First Name" name="firstname" className="form-control"
                                        value={this.state.firstname} onChange={this.changeFirstNameHandler}/>
                                   </div>
                                   
                                   <div className="form-group">
                                      <label>Last Name:</label>
                                      <input placeholder="Last Name" name="lastname" className="form-control"
                                        value={this.state.lastname} onChange={this.changeLastNameHandler}/>
                                   </div> 

                                   <div className="form-group">
                                      <label>User Name:</label>
                                      <input placeholder="User Name" name="username" className="form-control"
                                        value={this.state.username} onChange={this.changeUserNameHandler}/>
                                   </div>

                                        <div className="form-group">
                                      <label>Mobile No:</label>
                                      <input placeholder="Mobile No" name="mobileno" className="form-control"
                                        value={this.state.mobileno} onChange={this.changeMobileNoHandler}/>
                                     </div> 
                                        <div className="form-group">
                                      <label>E-mail:</label>
                                      <input placeholder="E-mail" name="email" className="form-control"
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                   </div> 
                                   <div className="form-group">
                                      <label>Role:</label>
                                         <select onChange={this.changeRoleHandler}  value={this.state.role} className="form-control form-control-lg" name="role">
                                        <option value="">Select Status</option>
                                        <option value="ROLE_USER">User</option>
                                        <option value="ROLE_PM">Project Manager</option>
                                        <option value="ROLE_ADMIN">Admin</option>
                                    </select>
                                   </div> 
  
                                   <button className="btn btn-success" onClick={this.updateEmployee}>save</button>
                                   <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>cancel</button>
                                </form>
                            </div>
                         </div>
                     </div>
                 </div>
             </div>
         );
     }
 }
export default UpdateEmployeeComponent;