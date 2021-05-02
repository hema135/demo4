import React from "react";
import ReactPlayer from "react-player";
import './Style.css';
// import "./App.css";

const VideoPlayer = () => {
    return (
        <div className = "row">
        <div className="col-xs-12 col-md-12 mt-2 vdplayer">
          <ReactPlayer
            height="200px"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          />{" "}
        </div>
        </div>
    )
}

export default VideoPlayer;