import React, { Component, useState } from "react";
import HeaderIcons from "./Icons/headerIcons";
import VideoPlayer from "./video/VideoPlayer";
import Recording from "./recording";
import "./App.css";
import FooterIcons from "./Icons/footerIcons";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    discard: false
  }
  onDiscard = () => {
    this.setState({discard: true})
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.discard) {
      this.setState({discard: false})
    }
  }
  render() {
  
  return (
        <React.Fragment>
      <div className="container" style={{"padding": "2%"}}>
        <div class="container-fluid">
        
          <div class="row">
            <HeaderIcons />
          </div>
          <div className="col-xs-12 col-md-12 text-center">
            <VideoPlayer />
            <Recording isDiscard = {this.state.discard}/>
          </div>
          <FooterIcons onDiscard = {this.onDiscard}/>
        </div>
      </div>
    </React.Fragment>
  );
  }
};

export default App;
