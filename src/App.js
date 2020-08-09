import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import './components/layout.css';

//import components
import Layout from './components/layoutComponent'

const mapStateToProps = state => ({
  ...state
})

class App extends Component {

  render() {
      return (
        <div className="App">          
          <Layout/>
        </div>
      );
  }
}
const mapDispatchToProps  = (dispatch) => {
  return {
    //nothing
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);