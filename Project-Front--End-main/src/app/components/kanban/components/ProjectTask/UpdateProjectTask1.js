import React, { Component } from "react";
import {getTaskById ,updateTask } from "../../actions/projectTaskActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

class UpdateProjectTask1 extends Component {


    constructor(){
        super();

        this.state = {
            taskId:"",
            project:"",
            employee1:"",
            taskname:"",
            startDate:"",
            endDate:"",
            status :"",
           errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        var taskAfterUpdate = {
            "taskId":this.state.taskId,
            "projectid":this.state.project.projectId,
            "empid":this.state.employee1.empId,
            "taskname":this.state.taskname,
            "startdate":this.state.startdate,
            "enddate":this.state.enddate,
            "status": this.state.status,
        }
        console.log(taskAfterUpdate);

        this.props.updateTask(this.state.taskId,taskAfterUpdate)
        this.props.history.push("/profile/project-board1");
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount(){
        const {pt_id} = this.props.match.params;
        this.props.getTaskById(pt_id);

    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        const {errors} = nextProps;
        // this.state.project_task = nextProps.project_task;
        const {
            taskId,taskname,status,project,employee1,startdate,enddate
        } = nextProps.project_task

        this.setState({
           taskId, taskname,status,project,employee1,startdate,enddate,errors
        })
    }
    render() {
        const { errors } = this.state;
        return (
            <div style={{  
                backgroundImage:"url('https://imgix.bustle.com/uploads/shutterstock/2020/3/25/72415f8c-3e06-40fc-b5a6-32fd76c7b567-shutterstock-1270572721.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: "755px",
                maxHeight:"100%",
                minWidth: "1024px"
              }}>
                  <div className="addProjectTask" >
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <br></br>                         
                    <br/> <br/>                       
                            <h4 className="display-5 text-center">Update Project Task</h4>
                           <br/>
                            <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                    <input onChange={this.onChange} value={this.state.taskname} type="text" className={classnames("form-control form-control-lg", { "is-invalid": errors.taskname })} name="taskname" placeholder="Project Task name" readonly="readonly"/>
                                    {
                                        errors.taskname && (
                                            <div className="invalid-feedback">errors.taskname</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="project id" value={this.state.project.projectId} name="project" readonly="readonly" ></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="emp id" value={this.state.employee1.empId} name="employee1" readonly="readonly"></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="Start Date" value={this.state.startdate} name="startdate" readonly="readonly"></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="End Date" value={this.state.enddate} name="enddate" readonly="readonly"></input>
                                </div>
                                <div className="form-group">
                                    <select onChange={this.onChange}  value={this.state.status} className="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input onSubmit={this.onSubmit} type="submit" className="btn btn-primary btn-block form-control-lg" />
                            </form>
                            <br/>
                            <Link to="/profile/project-board1" className="btn btn-primary btn-block form-control-lg">
                                Back to Board     
                            </Link>  
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

UpdateProjectTask1.propTypes = {
    project_task : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
    getTaskById :PropTypes.func.isRequired,
    updateTask : PropTypes.func.isRequired
}

const mapStateTpProps = state => ({
    project_task : state.project_tasks.project_task,
    errors : state.errors
})

export default connect( /** state */ mapStateTpProps ,  {getTaskById , updateTask}) ( UpdateProjectTask1);