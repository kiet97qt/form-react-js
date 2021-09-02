import React, { Component} from 'react';
import '../App.css';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name : '',
            status: false,
            isAddTaskMode: false
        }
    } 
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps?.task && (nextProps?.task?.id !== prevState?.id)){
            return {
                id: nextProps.task.id,
                name : nextProps.task.name,
                status: nextProps.task.status,
                isAddTaskMode: false
            };
         } else if (nextProps?.task === null && prevState.isAddTaskMode === false){
            return {
                id:'',
                name : '',
                status: false,
                isAddTaskMode: true
            };
         }
        return null
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('componentDidUpdate - prevProps',prevProps?.task?.id)
    //     console.log('componentDidUpdate - prevState',prevState?.id)

    //     if(prevProps?.task?.id !== this.props?.task?.id){
    //         this.setState({
    //             id: this.props.task.id,
    //             name : this.props.task.name,
    //             status: this.props.task.status,
    //         });
    //     }
    // }

    onChange = (event) =>{
        let name = event.target.name
        let value = event.target.value
        if(name === 'status'){
            value = value === 'true'? true : false 
        }
        this.setState({
            [name] : value
        })
    }

    onSubmit = (value) => {
        value.preventDefault();
        this.props.onSubmit(this.state)
        this.onClear();
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            status: false,
        })
    }

    render(){
        let {id} = this.state
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        {id !== ''?  'Modify Task': 'Add Task'}
                        <span className= "fas fa-times-circle ml-100" onClick = {this.props.onCloseForm}></span>
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            <label>Name :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name = 'name'
                                value = {this.state.name}
                                onChange = {this.onChange}
                            />
                        </div>
                        <label>Status :</label>
                        <select 
                            className="form-control" 
                            required="required"
                            name = 'status'
                            value = {this.state.status}
                            onChange = {this.onChange}
                        >
                            <option value= {true}>Active</option>
                            <option value= {false}>Hiden</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                {id !== ''?  'Modify': 'Add'}
                            </button>&nbsp;
                            <button type="button" className="btn btn-success" onClick = {this.onClear}>Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
