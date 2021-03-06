import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTast, removeTask, checkTask } from '../../actions/actionCreator';

import ToDoInput from '../../components/todo-input/todo-input';
import ToDoList from '../../components/todo-list/todo-list';


import './todo.css'



class ToDo extends Component {
  state = {
    activeFilter: 'all',
    taskText: ''
  }
  handleInputChange= ({ target:{ value } }) =>{
    this.setState({
      taskText: value,
    })
  }

  addTast = ({ key}) =>{
    const { taskText }= this.state;
    if(taskText.length>3 && key === 'Enter'){
      const { addTast } = this.props;
      addTast((new Date()).getTime(), taskText, false);

      this.setState({
        taskText: '',
      })
    }
  }
  render(){
    const { taskText} = this.state;
    const  { tasks, removeTask, checkTask } = this.props;
    const isTasksExist = tasks && tasks.length > 0;

    return(
      <div className="content">
      <ToDoInput onKeyPress={this.addTast} onChange={this.handleInputChange} value={taskText} />
      {isTasksExist && <ToDoList checkTask={checkTask} tasksList={tasks} removeTask={removeTask} />}
      </div>
    );
  }
}
export default connect(state => ({
  tasks: state.tasks,
}), {addTast, removeTask, checkTask})(ToDo);
