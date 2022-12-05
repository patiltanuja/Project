import React, { Component } from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types"; 
import {connect } from "react-redux";
import {deleteTask} from "../../actions/projectTaskActions";

class ProjectTaskItem extends Component {


    onDeleteClick(id){
        this.props.deleteTask(id);
    }
    render() {
        const  {project_task} = this.props;

        return (
            <div className="card mb-1 bg-light">

                <div className="card-header text-primary">
                    ID: {project_task.taskId}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title"> {project_task.taskname} </h5>
                    <p className="card-text text-truncate ">
                        {project_task.enddate}
                    </p>
                    <Link to={`/profile/update-task/${project_task.taskId}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button onClick={this.onDeleteClick.bind(this ,project_task.taskId)} className="btn btn-danger ml-4">
                        Delete
                   </button>
                </div>
            </div>
        );
    }
}

ProjectTaskItem.propType = {
    deleteProjectTask : PropTypes.func.isRequired     
}
export default connect( /* state */  null , {deleteTask}) (ProjectTaskItem);