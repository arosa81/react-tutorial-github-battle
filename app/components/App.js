import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Popular from './Popular';
import Home from './Home';
import Nav from './Nav';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/popular" component={Popular} />
        </div>
      </Router>
    );
  }
}

export default App;
