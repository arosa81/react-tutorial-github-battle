const React = require('react');

var PromptContainer = React.createClass({
  render: function() {
    return (
      <div className='jumbotron col-sm-6 col-sm-offset-3 text-center'>
        <h1></h1>
        <div>
          <form action="">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Github username"/>
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
