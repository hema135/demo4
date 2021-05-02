import React from "react";
import HeaderIcons from "./Icons/headerIcons";
import VideoPlayer from "./video/VideoPlayer";
import VideoRecord from "./video/VideoRecorder";
import AudioRecorder from "./audio/AudioRecoder";
import "./App.css";
import FooterIcons from "./Icons/footerIcons";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div class="container-fluid">
          <div class="row">
            <HeaderIcons />
          </div>

          <VideoPlayer />

          <div className="">
            <VideoRecord />
            <AudioRecorder />
          </div>
          <FooterIcons />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
