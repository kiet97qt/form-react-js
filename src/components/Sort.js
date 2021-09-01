import React, { Component} from 'react';

class Sort extends Component {
  render(){
    return (
        <div className="col-6">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Arrange <span className="fas fa-caret-square-down ml-30"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                    <a href="/#" role="button">
                    <span className="fas fa-sort-alpha-up pr-5">
                        Name A-Z
                    </span>
                    </a>
                </li>
                <li>
                    <a href="/#" role="button">
                    <span className="fas fa-sort-alpha-down pr-5">
                        Name Z-A
                    </span>
                    </a>
                </li>
                <li role="separator" className="dropdown-divider"></li>
                <li><a href="/#" role="button">Active</a></li>
                <li><a href="/#" role="button">Hiden</a></li>
                </ul>
            </div>
        </div>
    );
  }
}

export default Sort;
