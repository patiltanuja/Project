import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTask } from '../../actions/projectTaskActions';
import classnames from "classnames";

class AddProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            "projectid":"",
            "empid":"",
            "taskname":"",
            "startdate":"",
            "enddate":"",
            "status":"",
            "errors": ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange(e) {
        //console.log("new val " + [e.target.name] + " : " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newPojectTask = {
             
            "projectid":this.state.projectid,
            "empid":this.state.empid,
            "taskname":this.state.taskname,
            "startdate":this.state.startdate,
            "enddate":this.state.enddate,
            "status": this.state.status,
        };
        this.props.createTask(newPojectTask, this.props.history)
        // addProjectTask(newPojectTask , history);
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
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                        <br></br>                         
                    <br/> <br/>  
                            <h4 className="display-5 text-center">Add /Update Project Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input onChange={this.onChange} value={this.state.taskname} type="text" className={classnames("form-control form-control-lg", { "is-invalid": errors.summary })} name="taskname" placeholder="Project Task name" />
                                    {
                                        errors.taskname && (
                                            <div className="invalid-feedback">errors.taskname</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="project id" value={this.state.projectid} name="projectid"></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="emp id" value={this.state.empid} name="empid"></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="Start Date" value={this.state.startdate} name="startdate"></input>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange={this.onChange} placeholder="End Date" value={this.state.enddate} name="enddate"></input>
                                </div>
                                <div className="form-group">
                                    <select value={this.state.status} onChange={this.onChange} className="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                            <br/>
                            <Link to="/profile/project-board" className="btn btn-primary btn-block">
                                Back to Board
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createTask })(AddProjectTask);