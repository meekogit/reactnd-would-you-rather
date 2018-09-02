import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';

class NewQuestion extends Component {
  
  state = {
    optionOneText: '',
    optionTwoText: ''
  }
  
  handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [id]: value  
    }))
  }

  handleSubmit = (event) => {
    const { optionOneText, optionTwoText } = this.state;
    event.preventDefault();
    this.props.dispatch(handleAddQuestion(optionOneText, optionTwoText));
  }

  render() {
    const { optionOneText, optionTwoText } = this.state;
    return (
      <div>
        <h3>Create a new question</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Would you rather...
            <input 
              type="text" 
              id="optionOneText"
              placeholder="Enter first option"
              value={this.state.optionOneText} 
              onChange={this.handleChange}
            >
            </input>
            <p>or</p>
            <input 
              type="text"
              id="optionTwoText"
              placeholder="Enter second option"
              value={this.state.optionTwoText}
              onChange={this.handleChange}
            >
            </input>
          </label>
          <input 
            type="submit"
            value="Create"
            disabled={optionOneText === '' || optionTwoText=== ''}
          >
          </input>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion);