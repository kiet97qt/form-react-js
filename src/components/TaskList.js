import React, { Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus : 'all',
        }
    } 

    onChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );
        this.setState({
            [name]: value
        })
    }

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
                            <input type="text" 
                                    className="form-control" 
                                    name="filterName" 
                                    value={this.state.filterName} 
                                    onChange={this.onChange} />
                        </td>
                        <td>
                            <select className="form-control"
                                    name="filterStatus" 
                                    value={this.state.filterStatus} 
                                    onChange={this.onChange}
                            >
                                <option value="all">All</option>
                                <option value="hiden">Hiden</option>
                                <option value="active">Active</option>
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
