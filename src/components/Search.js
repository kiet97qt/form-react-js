import React, { Component} from 'react';

class Search extends Component {
  render(){
    return (
        <div className="col-6">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Input the keywords..." />
                <span className="input-group-btn">
                <button className="btn btn-primary" type="button">
                    <span className="fas fa-search mr-5"></span>Find
                </button>
                </span>
            </div>
        </div>
    );
  }
}

export default Search;
