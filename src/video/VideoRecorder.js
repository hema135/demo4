import React from 'react';
import VideoRecorder from 'react-video-recorder';
import './style.css';


const VideoRecord = () => {
    return (
        <div className="col-xs-12 col-md-12 text-center mt-4 vidRecoder">
<VideoRecorder 
    onRecordingComplete={videoBlob => {
      // Do something with the video...
      console.log('videoBlob', videoBlob)
    }}
  />
  </div>
    )
}
export default VideoRecord;