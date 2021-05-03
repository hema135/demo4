import * as React from "react";
import useRecorder from "./useRecorder";

function AudioRecorder() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  return (
    <div className="row">
      <audio src={audioURL} controls />
      <button onClick={startRecording} disabled={isRecording}>
        start recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </button>
    </div>
  );
}


export default AudioRecorder;