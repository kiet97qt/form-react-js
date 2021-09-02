import React, { Component} from 'react';

class Sort extends Component {
    onClick = (event,sortBy,sortValue) => {
        event.preventDefault();
        this.props.onSort(sortBy,sortValue)
    }

    textDropMenu = () => {
        switch(`${this.props.sortBy} - ${this.props.sortValue}`) {
            case 'name - 1':
                return 'Name A-Z'
            case 'name - -1':
                return 'Name Z-A'
            case 'status - 1':
                return 'Active'
            case 'status - -1':
                return 'Hiden'
            default:
                return 'Name A-Z'
        }
    }
    render(){
        return (
            <div className="col-6">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {this.textDropMenu()}<span className="fas fa-caret-square-down ml-30"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li>
                        <a href="/#" role="button" onClick = {(event) => this.onClick(event,'name',1)}>
                        <span className="fas fa-sort-alpha-up pr-5">
                            Name A-Z
                        </span>
                        </a>
                    </li>
                    <li>
                        <a href="/#" role="button" onClick = {(event) => this.onClick(event,'name',-1)}>
                        <span className="fas fa-sort-alpha-down pr-5">
                            Name Z-A
                        </span>
                        </a>
                    </li>
                    <li role="separator" className="dropdown-divider"></li>
                    <li>
                        <a href="/#" role="button" onClick = {(event) => this.onClick(event,'status',1)}>Active</a>
                    </li>
                    <li>
                        <a href="/#" role="button" onClick = {(event) => this.onClick(event,'status',-1)}>Hiden</a>
                    </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;
