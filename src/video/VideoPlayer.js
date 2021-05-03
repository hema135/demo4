import React from "react";
import ReactPlayer from "react-player";
import './Style.css';
// import "./App.css";

const VideoPlayer = () => {
    return (
      <section>
        <div className = "row">
          <div className="col-xs-12 col-md-12 mt-2 vdplayer">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />{" "}
          </div>
        </div>
      </section>
    )
}

export default VideoPlayer;