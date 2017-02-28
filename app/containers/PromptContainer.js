const React = require('react');
const transparentBg = require('../styles').transparentBg;

var PromptContainer = React.createClass({
  getInitialState: function() {
    return {
      username: ''
    }
  },
  onUpdateUser: function(e) {
    this.setState({
      username: e.target.value
    });
  },
  onSubmitUser: function(e) {
    e.preventDefault();
    var username = this.state.username;
    this.setState({
      username: ''
    });
  },
  render: function() {
    console.log(this);
    return (
      <div className='jumbotron col-sm-6 col-sm-offset-3 text-center' style={transparentBg}>
        <h1>{this.props.route.header}</h1>
        <div>
          <form onSubmit={this.onSubmitUser}>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Github username"
                onChange={this.onUpdateUser}
                value={this.state.username}/>
            </div>
            <div className="form-group col-sm-4 col-sm-offset-4">
              <button className="btn btn-block btn-success" type="submit">Continue</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
})

module.exports = PromptContainer;
