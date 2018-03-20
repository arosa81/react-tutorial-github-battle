import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from '../utils/api';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const players = queryString.parse(location.search);
    console.log(players);
    api.battle([players.playerOneName, players.playerTwoName])
      .then((results) => {
        if (results === null) {
          return this.setState(() => ({
            error: 'Looks like there was an error. Check that both users exist on Github',
            loading: false,
          }));
        }

        return this.setState(() => ({
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false,
        }));
      });
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    return (
      <div>
        {loading && <p>loading</p>}
        {error &&
          <div>
            <p>{error}</p>
            <Link to="/battle">Reset</Link>
          </div>
        }

        {!loading && <p>{JSON.stringify(this.state, null, 2)}</p>}
      </div>
    );
  }
}

Results.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Results;
