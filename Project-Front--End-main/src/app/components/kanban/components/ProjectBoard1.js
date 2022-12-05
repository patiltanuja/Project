import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectTaskItem from "./ProjectTask/PorjectTaskItem1";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllTask } from '../actions/projectTaskActions';
import AppNavbar from '../../AppNavbar';

class ProjectBoard1 extends Component {
    componentDidMount() {

        if(window.sessionStorage.getItem("auth")!=1){
            this.props.history.push("/");
          }      

        this.props.getAllTask();
    }
    render() {
        const { project_tasks } = this.props.project_tasks;

        let BoardContent;
        let todoItems = []; let inProgressItems = []; let doneItems = [];

        const BoardAlgorithms = project_tasks => {
            if (project_tasks.length < 1) {
                return (<div className="alert alert-info text-center" role="alert"> No Items</div>)
            } else {
                const tasks = project_tasks.map(
                    project_task => (
                        <ProjectTaskItem key={project_task.taskId}
                            project_task={project_task} />
                    ));

                for (var i = 0; i < tasks.length; i++) {
                    let m = tasks[i].props.project_task.status;
                    if (m === "TO_DO") {
                        todoItems.push(tasks[i]);
                    } else if (m === "IN_PROGRESS") {
                        inProgressItems.push(tasks[i]);
                    } else if (m === "DONE") {
                        doneItems.push(tasks[i]);
                    }
                }

            }

            return (
                <div>
           
                <React.Fragment>
                     
                    <div className="container">
                        <div className="row">

                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-secondary text-white">
                                        <h3>TO DO</h3>
                                    </div>
                                </div>
                                {todoItems}
                            </div>
                            
                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-primary text-white">
                                        <h3>In Progress</h3>
                                    </div>
                                </div>
                                {inProgressItems}
                            </div>

                            <div className="col-md-4">
                                <div className="card text-center mb-2">
                                    <div className="card-header bg-success text-white">
                                        <h3>Done</h3>
                                    </div>
                                </div>
                                {doneItems}
                            </div>

                        </div>
                    </div>
                </React.Fragment>
                </div>
            )
        };

       BoardContent =  BoardAlgorithms(project_tasks);
        return (
          <div>
                     <AppNavbar/>
                     <br/>
                <div className="container">
                {BoardContent}
                </div>
            </div>

        );
    }
}

ProjectTaskItem.porpTypes = {
    getBackLogs: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired
}

const mapToStateProp = state => ({
    project_tasks: state.project_tasks
})

export default connect(/* state */ mapToStateProp, { getAllTask }) (ProjectBoard1);