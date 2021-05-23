import React, { Component, createRef } from 'react'
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import MicIcon from "@material-ui/icons/Mic";
import "./style.css";
import VideoRecord from './VideoRecorder';
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AudioRecorder from '../audio/AudioRecoder';
import Modal from "../Modal";
import Popup from "../popup/welcome";
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";


const icon = [
	{
		icon: <VideoLibraryIcon style={{ "fontSize": "-webkit-xxx-large" }}/>,
        label: "Preview this recording before send or save",
        value:  "preview"
	},
	{
		icon: <CheckCircleIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
        label: "Save this recording in database for later select & send",
        value: "save"

	},
	{
		icon: <CancelRoundedIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
        label: "Discard this recording",
        value: "discard"
	},
	{
		icon: <AlbumOutlinedIcon style={{ "fontSize": "-webkit-xxx-large" }} />,
        label: "Record again / Start new recording",
        value: "record"
	}
];


class Recorder extends Component {

    state = {
        v: false,
        a: false,
        uploadModal: false,
        recentUploads: [],
        previewModal: false,
        saveModal: false
    }
    _vRecorder = createRef();
    _aRecorder = createRef();

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
        if(a == 'discard'){
            this.setState({a: false, v: false, blob: null});
        }

        if(a == 'save'){
            this.saveRecording()
        }

        if(a == 'record'){
            this.resetRecorder()
        }

        if(a == 'preview'){
            this.playRecording()
        }
    }


    resetRecorder = () => {
        // if(!this.state.blob) return false;
        let r;
        if(this.state.v){
            r = this._vRecorder && this._vRecorder.current;
            r.recorder && r.recorder.current && r.recorder.current.handleStopReplaying();
        }
        if(this.state.a){
            r = this._aRecorder && this._aRecorder.current;
            r.startRecording && r.startRecording();
        }
    }

    playRecording = () => {
        if(!this.state.blob) return false;
        let r;
        if(this.state.v){
            r = this._vRecorder && this._vRecorder.current;
            r.recorder && r.recorder.current && r.recorder.current.replayVideo.play();
        }
        if(this.state.a){
            r = this._aRecorder && this._aRecorder.current;
            r.audioPlay && r.audioPlay(); 
        }
    }

    saveRecording = (status) => {
        let blob = this.state.blob;
        if(!blob) return false;
        let d = new FormData();
        let ext = this.state.a && "wav" || this.state.v && "webm"
        d.append('file', blob, `file.${ext}`);
        if(this.state.a)
            d.append("type", 'audio');
        if(this.state.v)
            d.append("type", 'video');
        
        if(status)
            d.append('status', status);

        axios.post("/api/v1/uploads", d)
        .then(resp => {
            if(resp && resp.status == 200){
                let recentUploads = [...this.state.recentUploads];
                recentUploads.unshift(resp.data);
                recentUploads.slice(0, 4);
                this.setState({
                    uploadModal: true,
                    saveModal: !status && true,
                    recentUploads,
                    lastSavedVideo: !status && resp.data._id,
                    blob: null,
                    a: false,
                    v: false,
                    emptyUpload: false
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    sendAVforAnalysis = (id) => {
        axios.patch("/api/v1/uploads", {
            id: id,
            status: 'active'
        })
        .then(resp => {
            if(resp && resp.status == 200){
                let recentUploads = [...this.state.recentUploads];
                let i =  recentUploads.findIndex(el => el._id, id)
                if(i != -1){
                    recentUploads[i].status = "active"
                }
                this.setState({
                    a:false,
                    v: false,
                    uploadModal: true,
                    recentUploads,
                    lastSavedVideo: null,
                    blob: null,
                    previewModal: false,
                    emptyUpload: false
                })
            }
        })
        .catch(err => {
            console.log(err);
        }) 
    }

    handleUpload = () => {
        
        if(this.state.blob){
            return this.saveRecording("active");
        }

        if(this.state.lastSavedVideo){
            return this.sendAVforAnalysis(this.state.lastSavedVideo)
        }
        
        this.setState({
            uploadModal: true,
            emptyUpload: true
        })
    }

    closeModal = () => {
        this.setState({
            uploadModal: false
        })
    }

    handleRecordComplete = (blob) => {
        this.setState({
            blob: blob.blob || blob
        })
    }

    componentDidMount() {
        this.getRecentRecordings();
    }

    getRecentRecordings = () => {
        axios.get(`/api/v1/uploads?limit=5`)
        .then(resp => {
            if(resp && resp.data){
                let recentUploads = [...this.state.recentUploads, ...resp.data];
                this.setState({
                    recentUploads: recentUploads
                });
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    togglePreviewModal = () => {
        this.setState({
            previewModal: !this.state.previewModal
        })
    }

    handlePlayAV = (id, url, type) => {
        if(this.state.playMe && this.state.playMe.id == id){
            return this.setState({
                playMe: null
            })
        }
        this.setState({
            playMe: {
                id,
                url, type
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.uploadModal && (this.state.saveModal || this.state.emptyUpload))
        if(this.state.uploadModal && (this.state.saveModal || this.state.emptyUpload)){
            if(this.t) return;
            this.t = setTimeout(() => {
                this.t = null;
                this.setState({
                    uploadModal: false,
                    saveModal: false,
                    emptyUpload: false
                })
            }, 1000)
        }
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
                            <VideoRecord 
                                onRecordingComplete={this.handleRecordComplete} 
                                ref={this._vRecorder}
                            />
                        </div>
                    }
                    {a &&
                        <div className="col-sm-12">
                            <div className="in-container ad-rec-con">
                                <AudioRecorder 
                                    onRecordingComplete={this.handleRecordComplete}
                                    ref={this._aRecorder}
                                />
                            </div>
                        </div>
                    }
                    {(a || v) && 
                        <div className="col-sm-12">
                            <div className="foot-icon in-container">
                                {icon.map((el, i) => 
                                    <div className="icon-set" key={i} onClick={() => this.handleAction(el.value)}>
                                        {el.icon}
                                        <b>{el.label}</b>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    <div className="col-sm-12">
                        <div className="btm-action-container in-container">
                            <button className="btn btn-info" onClick={this.handleUpload}>
                                Send this recording for analysis
                                {/* SEND THIS RECORD FOR ANALYSIS */}
                            </button>
                            <button className="btn btn-danger" onClick={this.togglePreviewModal}>
                                Browse & select from saved recordings to send
                                {/* BROWSE & SELECT FROM SAVED RECORDINGS TO SEND */}
                            </button>
                        </div>
                    </div>

                    <Modal 
                        closeOnOverlayClick={true} 
                        className="mmmModal" 
                        isOpen={this.state.uploadModal} 
                        onClose={this.closeModal}
                    >
                        <span className="close-modal-btn">
                            <CloseIcon onClick={this.closeModal} />
                        </span>
                        {this.state.emptyUpload &&
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="alert alert-info" style={{marginTop: 20}}>
                                        Please make a recording first to send it for analysis.
                                    </div>
                                </div>
                            </div>
                        }
                        {!this.state.emptyUpload && this.state.saveModal && 
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="alert alert-success text-center">
                                        Your recording saved successfully.
                                    </div>
                                </div>
                            </div>
                        }
                        {!this.state.emptyUpload && !this.state.saveModal &&
                            <Popup />
                        }
                    </Modal>
                    <Modal 
                        header={"Play Recents"} 
                        className="preview-modal" 
                        isOpen={this.state.previewModal} 
                        onClose={this.togglePreviewModal}
                    >
                        <div className="row">
                            <div className="col-sm-12">
                                {this.state.recentUploads.length <= 0 &&
                                    <div className="alert alert-info text-center">
                                        You have no recording to play.
                                    </div>
                                }
                                {this.state.recentUploads.length > 0 &&
                                    <table className="table-stripped table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    S.No
                                                </th>
                                                <th>
                                                    Date/Time
                                                </th>
                                                <th>
                                                    Filename
                                                </th>
                                                <th>
                                                    File Type
                                                </th>
                                                <th>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.recentUploads.map((el, i) =>
                                                <React.Fragment key={i}>
                                                    <tr>
                                                        <td>
                                                            {i+1}
                                                        </td>
                                                        <td>
                                                            {moment(el.created_at).format("DD MMM YYYY HH:MM a")}
                                                        </td>
                                                        <td>
                                                            {el.filename}
                                                        </td>
                                                        <td>
                                                            {el.type.toUpperCase()}
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-success" style={{marginRight: 10}} onClick={() => this.handlePlayAV(el._id, el.url, el.type)}>
                                                                {(this.state.playMe && this.state.playMe.id == el._id) ?
                                                                    "Close Player" : 
                                                                    <>
                                                                        Play <PlayCircleOutlineIcon />
                                                                    </>
                                                                }
                                                            </button>
                                                            {el.status !== 'active' && 
                                                                <button className="btn btn-info" onClick={() => this.sendAVforAnalysis(el._id)}>
                                                                    Send
                                                                </button>
                                                            }
                                                        </td>
                                                    </tr>
                                                    {(this.state.playMe && this.state.playMe.id == el._id) &&
                                                        <tr>
                                                            <td colSpan="10">
                                                                <div className="play-me text-center">
                                                                    {el.type == 'audio' &&
                                                                        <audio autoPlay src={`/${el.url}`} controls />
                                                                    }
                                                                    {el.type == 'video' &&
                                                                        <video
                                                                            src={`/${el.url}`}
                                                                            width="100%"
                                                                            controls
                                                                            autoPlay
                                                                        />
                                                                    } 
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    }
                                                </React.Fragment>
                                            )}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
        )
    }
}

export default Recorder;




