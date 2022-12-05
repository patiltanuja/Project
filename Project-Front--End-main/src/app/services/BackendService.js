import axios from 'axios';

//const EMPLOYEE_API_BASE_URL="http://localhost:8083/api/v1/employees";
// Add a request interceptor
axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    const token = 'Bearer ' + user.accessToken;
    config.headers.Authorization =  token;
  }

  return config;
});

class BackendService {

getEmployees(){
  return axios.get("http://localhost:8082/api/auth/employees");
}

getEmployee(){
  return axios.get("http://localhost:8082/api/v1/employee");
}

getProject(){
  return axios.get("http://localhost:8082/api/v1/project1");
}

getEmployee1(){
  return axios.get("http://localhost:8082/api/v1/employee1");
}

getRoles(){
  return axios.get("http://localhost:8082/api/auth/roles");
}

getEmployeeById(employeeId){
  return axios.get("http://localhost:8082/api/auth/employees"+'/'+employeeId);
}

updateEmployee(employee,employeeId){
  return axios.put("http://localhost:8082/api/auth/employees" +'/'+ employeeId,employee);
}

deleteEmployee(employeeId){
  return axios.delete("http://localhost:8082/api/auth/delete" + '/' + employeeId);
}

createTask(task)
{
  return axios.post("http://localhost:8082/api/v1/task",task);
}

getTaskById(taskId){
  return axios.get("http://localhost:8082/api/v1/task"+'/'+taskId);
}

updateTask(task,taskId){
  return axios.put("http://localhost:8082/api/v1/task"+"/"+taskId,task);
} 

createProject(project)
{
  return axios.post("http://localhost:8082/api/v1/project",project);
}

createEmployee(employee){
  return axios.post("http://localhost:8082/api/v1/employee",employee);
}

  async getUserBoard() {
    return await axios.get("http://localhost:8082/api/test/user");
  }

  async getPmBoard() {
    return await axios.get("http://localhost:8082/api/test/pm");
  }

  async getAdminBoard() {
    return await axios.get("http://localhost:8082/api/test/admin");
  }
}

export default new BackendService();