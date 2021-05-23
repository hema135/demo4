import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react'
import Modal from '../Modal';
import "./style.css";

class Records extends Component {

    state = {
        records: [],
        loading: false
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        axios.get("/api/v1/get_recordings")
        .then(resp => {
            if(resp && resp.status == 200){
                this.setState({
                    records: resp.data
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    handlePlayMe = (el) => {
        this.setState({
            playMeModal: true,
            playme: {
                src: el.url
            }
        })
    } 

    closePlayMeModal = () => {
        this.setState({
            playMeModal: false,
            playme: {
            }
        })
    }


    render() {
        const { records } = this.state;
        return (
            <div className="container-fluid records-container" style={{marginTop: 30}}>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Records</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    {["S.No.", "File", "Date time", "Creator's Email", "Creator's Full Name"].map((el, i) => 
                                        <th key={i}>
                                            {el}
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {records.length == 0 &&
                                    <tr>
                                        <td colSpan="10" className="text-center">
                                            No Records Found
                                        </td>
                                    </tr>
                                }
                                {records.map((el, i) => 
                                    <tr key={el._id}>
                                        <td>
                                            {i+1}.
                                        </td>
                                        <td>
                                            {el.type == 'video' &&
                                                <video
                                                    src={`/${el.url}`}
                                                    width="200px"
                                                    height="200px"
                                                    onClick={() => this.handlePlayMe(el)}
                                                />
                                            }
                                            {el.type == 'audio' &&
                                                <audio
                                                    src={`/${el.url}`}
                                                    width="200px"
                                                    controls
                                                />  
                                            }
                                        </td>
                                        <td>
                                            {moment(el.created_at).format("DD MMM YYYY HH:MM a")}
                                        </td>
                                        <td>
                                            {el.createdBy.email}
                                        </td>
                                        <td>
                                            {el.createdBy.firstName} {el.createdBy.lastName}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.playMeModal &&
                    <Modal isOpen={this.state.playMeModal} onClose={this.closePlayMeModal} header={"Player"}>
                        <video src={`/${this.state.playme.src}`} width="100%" controls autoPlay/>
                    </Modal>
                }
            </div>
        )
    }
}

export default Records;
