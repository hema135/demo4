import React from 'react';
import VideoRecorder from 'react-video-recorder';
import './Style.css';


const VideoRecord = () => {
    return (
      <div className="row overwriteRow">
      <div className="col-xs-12 col-md-12 mt-2 vdplayer">
<VideoRecorder 
    onRecordingComplete={videoBlob => {
      // Do something with the video...
      console.log('videoBlob', videoBlob)
    }}
  />
  </div>
  </div>
    )
}
export default VideoRecord;