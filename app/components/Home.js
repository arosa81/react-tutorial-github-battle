import React from 'react';
import { Link } from 'react-router-dom';

const transparentBg = require('../styles').transparentBg;

export default function Home(props) {
  return (
    <div className="home-container" style={transparentBg}>
      <h1>Github Battle: Battle your friends...and stuff.</h1>
      <Link className="button" to="/battle">
        Battle
      </Link>
    </div>
  );
}
