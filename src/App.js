import './App.css';
import React, { Component} from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import uuid from 'react-uuid'

class App extends Component {

  constructor(props){
    super(props);
    this.isComponentMounted = false;
    this.state = {
        tasks : [],
        taskEditting: null,
        isDisplayForm: false,
        filterName: '',
        filterStatus : 'all',
        keyword: '',
        sortBy : 'name',
        sortValue : 1 
    }
  } 

  onClearData = () => {
    let tasks = []
    localStorage.setItem('tasks',JSON.stringify(tasks))
    this.setState({
      tasks: tasks
    })
  }

  onSubmit = (data) => {
    let {tasks} = this.state 
    if(data.id !== ''){
      tasks.forEach((task,index) => {
        if(task.id === data.id){
          tasks[index] = data;
        }
      })
    } else {
      data.id = uuid();
      tasks.push(data);
    }
    localStorage.setItem('tasks',JSON.stringify(tasks))
    this.setState({
      tasks: tasks
    })
  }

  async componentDidMount(){
    this.isComponentMounted = true;
    try {
      if( localStorage && localStorage.getItem('tasks')){
        let tasks = await JSON.parse(localStorage.getItem('tasks'))
        this.setState({
          tasks: tasks
        })
      }
    } catch(error){
      console.log('error',error)
    }

  }

  componentWillUnmount(){
    this.isComponentMounted = false;
  }

  onToggleForm = () =>{
    if(this.state.isDisplayForm === true && this.state.taskEditting !== null){
      this.setState({
        isDisplayForm : true,
        taskEditting: null
      })
    } else {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditting: null
      })
    }
  }

  onCloseForm = () =>{
    this.setState({
      isDisplayForm : false
    })
  }

  onShowForm = () =>{
    this.setState({
      isDisplayForm : true
    })
  }

  onUpdateStatus = (id) =>{
    let {tasks} = this.state 
    tasks.forEach((task,index) => {
      if(task.id === id){
        tasks[index].status = !tasks[index].status;
      }
    })
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }

  onUpdate = (id) => {
    let {tasks} = this.state 
    tasks.forEach((task) => {
      if(task.id === id){
        this.setState({
          taskEditting: task
        })
      }
    })
    this.onShowForm()
  }

  onFilter = (filterName,filterStatus) => {
    this.setState({
      filterName: filterName,
      filterStatus: filterStatus
    })
  }

  onDeleteItem = (id) => {
    let {tasks} = this.state 
    let newTasks = []
    tasks.forEach((task) => {
      if(task.id !== id){
        newTasks.push(task)
      }
    })
    this.setState({
      tasks: newTasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    this.onCloseForm()
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }

  render(){
    let {tasks, isDisplayForm, filterName, filterStatus, keyword, sortBy, sortValue} = this.state;
    let eleForm = isDisplayForm ? <TaskForm onCloseForm = {() => this.onCloseForm()} 
                                            onSubmit = {this.onSubmit}
                                            task = {this.state.taskEditting}
                                  ></TaskForm> : ''
    if(filterName.toLowerCase() !== ''){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().includes(filterName.toLowerCase())
      })
    }

    if(filterStatus !== 'all'){
      filterStatus = filterStatus === 'active'? true : false 
      tasks = tasks.filter((task) => {
        return task.status === filterStatus
      })
    }

    tasks = tasks.sort((firstEle,secondEle) => {
      if(sortBy === 'name') {
        if(sortValue === 1){
          return firstEle.name.toLowerCase() > secondEle.name.toLowerCase()? 1 : -1 
        } else {
          return firstEle.name.toLowerCase() < secondEle.name.toLowerCase()? 1 : -1
        }
      } else {
        if(sortValue === 1){
          return firstEle.status > secondEle.status ? -1 : 1
        } else {
          return firstEle.status < secondEle.status ? -1 : 1
        }      
      }
    })  

    if(keyword.toLowerCase() !== ''){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().includes(keyword.toLowerCase())
      })
    }

    return (
      <div className="container">
        <div className="text-center">
            <h1>Task Management</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm === true?'col-4' : ''}>
              {eleForm}
            </div>
            <div className={isDisplayForm === false?'col-12' : 'col-8'}>
                <button type="button" className="btn btn-primary" onClick={ () => this.onToggleForm() }>
                    <span className="fas fa-plus mr-5"></span>Add Task
                </button>
                <button type="button" className="btn btn-warning ml-5" onClick = {() => this.onClearData()}> 
                    Clear Data
                </button>
                <Control onSearch = {this.onSearch} onSort= {this.onSort} sortBy = {sortBy} sortValue = {sortValue}></Control>
                <div className="row mt-15">
                    <div className="col-12">
                      <TaskList 
                        tasks = {tasks} 
                        onUpdateStatus={this.onUpdateStatus} 
                        onDeleteItem ={this.onDeleteItem}
                        onUpdate = {this.onUpdate}
                        onFilter = {this.onFilter}
                      ></TaskList>
                    </div>
                </div>
            </div>
        </div>
      </div>  
    );
  }
}

export default App;
