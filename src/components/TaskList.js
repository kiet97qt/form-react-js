import React, { Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  render(){
    let {tasks} = this.props
    let eleTasks = tasks.map((task,index) => {
        return <TaskItem 
                    key={task.id} 
                    task={task} 
                    index={index}
                    onUpdateStatus = {this.props.onUpdateStatus}
                    onDeleteItem = {this.props.onDeleteItem}
                    onUpdate = {this.props.onUpdate}
                ></TaskItem>
    })

    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" className="form-control" />
                    </td>
                    <td>
                        <select className="form-control">
                            <option value="-1">All</option>
                            <option value="0">Hiden</option>
                            <option value="1">Active</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {eleTasks}
            </tbody>
        </table>
    );
  }
}

export default TaskList;
