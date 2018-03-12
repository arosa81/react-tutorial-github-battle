import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState(() => ({ userName: value }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.userName,
    );
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="userName" className="header">
          {this.props.label}
        </label>
        <input
          type="text"
          id="userName"
          placeholder="github username"
          autoComplete="off"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.userName}
        >
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, userName) {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = userName;
      newState[`${id}Image`] = `https://github.com/${userName}.png?size=200`;
      return newState;
    });
  }

  render() {
    const { playerOneName, playerTwoName } = this.state;
    return (
      <div>
        <div className="row">
          {!playerOneName && 
            <PlayerInput 
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />}
          {!playerTwoName &&
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />}
        </div>
      </div>
    );
  }
}

export default Battle;
