import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Provider } from "react-redux";
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Profile from './app/components/Profile';
import UserPage from './app/components/UserPage';
import ProjectManagerPage from './app/components/ProjectManagerPage';
import ProjectManagerPage1 from './app/components/ProjectManagerPage1';
import SignUp from './app/components/SignUp';
import AdminPage from './app/components/AdminPage';
import Login from './app/components/Login';
import AppHome from './app/components/views/home';
import AppHero from './app/components/home/hero';
import UpdateEmployeeComponent from './app/components/UpdateEmployeeComponent';
import CreateEmployeeComponent from './app/components/CreateEmployeeComponent';
import CreateEmployeeComponent1 from './app/components/CreateEmployeeComponent1';
import AddTaskComponent from './app/components/AddTaskComponent';
import ProjectBoard from './app/components/kanban/components/ProjectBoard';
import ProjectBoard1 from './app/components/kanban/components/ProjectBoard1';
import ProjectBoard2 from './app/components/kanban/components/ProjectBoard2';
import AddProjectTask from './app/components/kanban/components/ProjectTask/AddProjectTask';
import UpdateProjectTask from './app/components/kanban/components/ProjectTask/UpdateProjectTask';
import UpdateProjectTask1 from './app/components/kanban/components/ProjectTask/UpdateProjectTask1';
import Apps from './Apps';

function App() {  
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
    <Switch>
    <Route exact={true} path="/" component={AppHome} />
      <Route path="/hero" component={AppHero} />
      <Route path='/profile' exact component={Profile}/>
      <Route path='/user' exact component={UserPage}/>
      <Route path='/pm' exact component={ProjectManagerPage}/>
      <Route path='/pm1' exact component={ProjectManagerPage1}/>
      <Route path='/admin' exact component={AdminPage}/>
      <Route path='/Login' exact component={Login}/>
      <Route path='/signup' exact component={SignUp}/> 
      <Route path='/update-employee/:id' exact component={UpdateEmployeeComponent}/>
      <Route path='/create-employee' exact component={CreateEmployeeComponent}/>
      <Route path='/create-employee1' exact component={CreateEmployeeComponent1}/>
      <Route path='/create-task' exact component={AddTaskComponent}/>
      <Route path="/profile/project-board" component={ProjectBoard}></Route>
      <Route path="/profile/project-board1" component={ProjectBoard1}></Route>
      <Route path="/profile/project-board2" component={ProjectBoard2}></Route>
      <Route path="/profile/addProjectTask" component={AddProjectTask} />
      <Route path="/profile/update-task/:pt_id" component={UpdateProjectTask} />
      <Route path="/profile/update-task1/:pt_id" component={UpdateProjectTask1} />
      <Route path="/Schedular" component={Apps} />
    </Switch>
    </div>
  </Router>
  </Provider>
  );
}

export default App;
