import BackendService from '../services/BackendService';
import React, { Component } from 'react';
import { Button,Input, Label} from "reactstrap";

class  AddTaskComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state={
        projectid:"",
        empid:"",
        taskname:"",
        startdate:"",
        enddate:"",
        status:""
    }
    this.createTask=this.createTask.bind(this);
  }

  changeProjectIdHandler=(event) => {
    this.setState({projectid: event.target.value});
}

changeEmpIdHandler=(event)=>{
    this.setState({empid: event.target.value});
}

changeTaskNameHandler=(event)=>{
    this.setState({taskname: event.target.value});
}
changeStartDateHandler=(event)=>{
    this.setState({startdate: event.target.value});
}

changeEndDateHandler=(event)=>{
    this.setState({enddate: event.target.value});
}
 
changeStatusHandler=(event)=>{
    this.setState({status: event.target.value});
}

  createTask=(e)=>{
    e.preventDefault();
    let employee={projectid: this.state.projectid,empid: this.state.empid,taskname:this.state.taskname,
    startdate:this.state.startdate,enddate:this.state.enddate,status:this.state.status};
    console.log('employee =>'+JSON.stringify(employee)); 
    BackendService.createTask(employee,this.state.projectid,this.state.empid,this.state.taskname,
                           this.state.startdate,this.state.enddate,this.state.status).then(res =>{
      this.props.history.push('/user');
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
  }


  render() {
    return (
      <div>             
        <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                              
                                <div className = "card-body">
        <form>
                <Label>Enter Project Id</Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter Project Id"
                  value={this.state.projectid}
                  onChange={this.changeProjectIdHandler}
                />
                <Label>Enter Emp ID</Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter emp id"
                  value={this.state.empid}
                  onChange={this.changeEmpIdHandler}
                />

                <Label>Enter Task Name</Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter task name"
                  value={this.state.taskname}
                  onChange={this.changeTaskNameHandler}
                />

                <Label>Enter Start Date</Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter start date"
                  value={this.state.startdate}
                  onChange={this.changeStartDateHandler}
                />

                <Label>Enter End Date</Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter end date"
                  value={this.state.enddate}
                  onChange={this.changeEndDateHandler}
                />

                <Label>Enter Status</Label>
                <Input autoFocus
                  type="text" 
                  placeholder="Enter status"
                  value={this.state.status}
                  onChange={this.changeStatusHandler}
                />

              <Button variant="primary" onClick={this.createTask} type="submit" className="btn bg-primary">
               Add Task
              </Button>
        </form>
        </div>
        </div>
    </div>

    </div>
      </div>
    );
  }
}
export default AddTaskComponent;