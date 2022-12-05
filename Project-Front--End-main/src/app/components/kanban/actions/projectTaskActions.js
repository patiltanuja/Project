import axios from "axios";
import {GET_SINGLE_PROJECT_TASK, DELETE_PROJECT_TASK, GET_ERRORS, GET_PROJECT_TASK,UPDATE_PROJECT_TASK } from './types'

export const createTask = (project_task, history) => async dispatch => {

    try {
        await axios.post("http://localhost:8082/api/v1/task", project_task);
        console.log(project_task);
        history.push("/profile");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}


export const getAllTask = () => async dispatch => {
    const res = await axios.get("http://localhost:8082/api/v1/task");
    console.log(res.data);
    dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
    })
}

export const deleteTask = id => async  dispatch => {
    if (window.confirm(`Are you sure Delete Project  Task ${id}`)) {
        const res = await axios.delete(`http://localhost:8082/api/v1/task/${id}`);
        console.log(res.data);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: id
        })
}}

export const getTaskById = ( id,history) => async dispatch =>{
    try{
        const res = await axios.get(`http://localhost:8082/api/v1/task/${id}`);
        console.log(res.data);

        dispatch({
            type : GET_SINGLE_PROJECT_TASK,
            payload : res.data
        })
    }catch(error)
    {
            history.push("/profile");
    }
}
/*
export const updateTask =(id,project_task, history) => async  dispatch => 
    {
        try {
                await axios.put(`http://localhost:8082/api/v1/task/${id}`, project_task);
                console.log(project_task);
                history.push("/profile");
                dispatch({
                    type: GET_ERRORS,
                    payload: {}
                })
            } catch (error) {
                dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data
                })
            }
    }*/

   const _updateTask = (id, updates) => ({
        type: 'UPDATE_PROJECT_TASK ',
        id,
        updates
    });
    
    export const updateTask = (id, updates) => {
        console.log(updates);
        return (dispatch) => {
            return axios.put(`http://localhost:8082/api/v1/task/${id}`, updates).then(() => {
                dispatch(_updateTask(id, updates));
            });
        }
    };

    