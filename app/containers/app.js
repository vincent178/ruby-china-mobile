import React, { Component } from 'react';

import TopicContainer from './topic-container';

import '../assets/stylesheets/index.css';

const Width = window.innerWidth;
const Height = window.innerHeight;

export default class App extends Component {

  constructor(props) {
    super(props);

    console.log(Width);
    console.log(Height);
  }

  render() {
    return (
      <div>
        <TopicContainer />

        <div className="toolbar">
          <div>
            <span className="tab-item selected">Topics</span>
          </div>
          <div>
            <span className="tab-item">Notification</span>
          </div>
          <div>
            <span className="tab-item">Me</span>
          </div>
        </div>
      </div>
    );
  }
}