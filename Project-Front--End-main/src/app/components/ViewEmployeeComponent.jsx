import React, { Component } from 'react'
import BackendService from '../services/BackendService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        BackendService.getEmployeeById(this.state.id).then( res => {
            this.setState({employees: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Employee First Name: </label>
                            <div> { this.state.employee.firstname}</div>
                        </div>

                        <div className = "row">
                            <label> Employee Last Name: </label>
                            <div> { this.state.employee.lastname }</div>
                        </div>

                        <div className = "row">
                            <label> Employee Mobile No: </label>
                            <div> { this.state.employee.mobileno }</div>
                        </div>
                        <div className = "row">
                            <label> Employee Email ID: </label>
                            <div> { this.state.employee.email }</div>
                        </div>

                        <div className = "row">
                            <label> Employee Role: </label>
                            <div> { this.state.employee.role }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent