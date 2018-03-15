import React from 'react';
import PropTypes from 'prop-types';

function puke(obj) {
  return (<pre>{JSON.stringify(obj, null, ' ')}</pre>);
}

function Results(props) {
  return (
    <div>
      Results
    </div>
  );
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired,
};

export default Results;
