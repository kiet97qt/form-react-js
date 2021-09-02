import React, { Component} from 'react';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
        keyword: '',
    }
  } 

  onChange = (event) => {
    this.setState ({
      [event.target.name]: event.target.value,
    })
  }

  render(){
    return (
        <div className="col-6">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Input the keywords..." name="keyword" value={this.state.keyword} onChange = {this.onChange}/>
                <span className="input-group-btn">
                <button className="btn btn-primary" type="button"  onClick = {() => this.props.onSearch(this.state.keyword)}>
                    <span className="fas fa-search mr-5"></span>Find
                </button>
                </span>
            </div>
        </div>
    );
  }
}

export default Search;
