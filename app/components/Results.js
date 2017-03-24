const React = require('react');
const PropTypes = React.PropTypes;
const ReactRouter = require('react-router');

function puke(obj) {
    return <pre>{JSON.stringify(obj, null, ' ')}</pre>
}

function Results(props) {
    return (
        <div>
            Results
        </div>
    )
}

Results.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    playersInfo: PropTypes.array.isRequired,
    scores: PropTypes.array.isRequired
}

module.exports = Results;