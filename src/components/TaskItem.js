import React, { Component} from 'react';

class TaskItem extends Component {

    render(){
        let {task,index} = this.props
        return (
            <tr>
                <td>{ index+1 }</td>
                <td>{ task.name}</td>
                <td className="text-center">
                <span className={task.status === true ? 'bg-danger' : 'bg-success'} 
                    onClick = {() => this.props.onUpdateStatus(task.id)}>
                    {task.status === true ? 'Active' : 'Hiden'}
                </span>
                </td>
                <td className="text-center">
                <button 
                type="button" 
                className="btn btn-warning"
                onClick = {() => this.props.onUpdate(task.id)}>
                    <span className="fas fa-pencil-alt mr-5"></span>Modify
                </button>
                &nbsp;
                <button 
                type="button" 
                className="btn btn-danger "
                onClick = {() => this.props.onDeleteItem(task.id)}>
                    <span className="fas fa-trash mr-5"></span>Delete
                </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
