import React, { Component, createRef } from 'react'
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MicIcon from "@material-ui/icons/Mic";
import "./style.css";
import VideoRecord from './VideoRecorder';
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";
import AudioRecorder from '../audio/AudioRecoder';

const icon = [
	{
		icon: <VideoLibraryIcon style={{ "fontSize": "-webkit-xxx-large" }}/>,
		label: "PREVIEW"
	},
	{
		icon: <CheckCircleIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
		label: "SAVE THIS RECORDING"
	},
	{
		icon: <CancelRoundedIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
		label: "DISCARD THIS"
	},
	{
		icon: <AlbumOutlinedIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
		label: "RECORD AGAIN"
	}
];


class Recorder extends Component {

    state = {
        v: false,
        a: false
    }

    handleAVAction = t => {
        let { a, v } = this.state;
        if(t == 'a'){
            a = true;
            v = false;
        }
        if(t == 'v'){
            a = false;
            v = true;
        }

        this.setState({a, v})
    }

    handleAction = action => {
        let a = action.toLowerCase();
        if(a == 'discard this'){
            this.setState({a: false, v: false});
        }

        if(a == 'save'){
            this.saveRecording()
        }

        if(a == 'record again'){
            this.resetRecorder()
        }

        if(a == 'preview'){
            //do something here
            this.playRecording()
        }
    }

    saveRecording = () => {

    }

    render() {
        let { a, v } = this.state;
        return (
                <div className="row">
                    {(!a && !v) &&
                        <div className="col-sm-12">
                            <div className="banner av-recorder in-container">
                                <div className="media-section text-center" onClick={() => this.handleAVAction("v")}>
                                    <CameraAltIcon />
                                    <h2>CLICK TO RECORD MY VIDEO</h2>
                                    <p>WILL USE LAPTOPS/WEBCAM/PHONE'S CAMERA</p>
                                </div>
                                <div className="media-section text-center" onClick={() => this.handleAVAction("a")}>
                                    <MicIcon />
                                    <h2>CLICK TO RECORD MY AUDIO</h2>
                                    <p>WILL USE LAPTOPS/PHONE'S MICROPHONE</p>
                                </div>
                            </div>
                        </div>
                    }
                    {v && 
                        <div className="col-sm-12">
                            <VideoRecord />
                        </div>
                    }
                    {a &&
                        <div className="col-sm-12">
                            <div className="in-container ad-rec-con">
                                <AudioRecorder />
                            </div>
                        </div>
                    }
                    {(a || v) && 
                        <div className="col-sm-12">
                            <div className="foot-icon in-container">
                                {icon.map((el, i) => 
                                    <div className="icon-set" key={i} onClick={() => this.handleAction(el.label)}>
                                        {el.icon}
                                        <b>{el.label}</b>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    <div className="col-sm-12">
                        <div className="btm-action-container in-container">
                            <button className="btn btn-info">
                                Upload
                            </button>
                            <button className="btn btn-danger">
                                Browse Saved Recordings & Upload
                            </button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Recorder;




