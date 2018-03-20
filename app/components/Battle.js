import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PlayerPreview(props) {
  return (
    <div className="column">
      <img
        className="avatar"
        src={props.avatar}
        alt={`Avatar for ${props.userName}`}
      />
      <h2 className="username">@{props.userName}</h2>
      <button
        className="reset"
        onClick={props.onReset.bind(null, props.id)}
      >
        Reset
      </button>
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

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
};

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
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, userName) {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = userName;
      newState[`${id}Image`] = `https://github.com/${userName}.png?size=200`;
      return newState;
    });
  }

  handleReset(id) {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null;
      return newState;
    });
  }

  render() {
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
    const { match } = this.props;
    return (
      <div>
        <div className="row">
          {!playerOneName && 
            <PlayerInput 
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              userName={playerOneName}
              onReset={this.handleReset}
              id="playerOne"
            />}

          {!playerTwoName &&
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              userName={playerTwoName}
              onReset={this.handleReset}
              id="playerTwo"
            />}
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className="button"
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
            }}
          >
            Battle
          </Link>}
      </div>
    );
  }
}

export default Battle;
