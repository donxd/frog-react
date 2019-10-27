import React, { Component } from 'react';
import Frog from './Frog';

class App extends Component {
  render () {
    // <Frog></Frog>
    // <Frog boxes="7" selected="4"></Frog>
    // <Frog config selected="2"></Frog>
    // <Frog boxes="10"></Frog>
    // <Frog boxes="7" selected="4"></Frog>
    // <Frog id='test_config' config></Frog>
    
    // <Frog boxes="7" selected="4"></Frog>
    return (
      <div>
          <Frog></Frog>
          <Frog boxes="7" selected="4"></Frog>
          <Frog config selected="2"></Frog>
          <Frog boxes="10"></Frog>
          <Frog boxes="7" selected="4"></Frog>
          <Frog id='test_config' config></Frog>
      </div>
    );
  }
}

export default App;
