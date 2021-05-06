import React, { Component, createRef } from 'react';
import VideoRecorder from 'react-video-recorder';


class VideoRecord extends Component{
	recorder = createRef()
	render() {
		const props = this.props;
		return (
			<div className="overwriteRow in-container">
				<div className="video-recorder">
					<VideoRecorder 
						onRecordingComplete={videoBlob => {
							props.onRecordingComplete && props.onRecordingComplete(videoBlob);
						}}
						replayVideoAutoplayAndLoopOff={true}
						showReplayControls={true}
						isOnInitially={true}
						ref={this.recorder}
					/>
				</div>
			</div>
		)
	}
}

export default VideoRecord;