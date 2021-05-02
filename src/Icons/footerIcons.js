import React from "react";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";


const FooterIcons = () => {
    return (
        <React.Fragment>
        <div className="demoicons">
        <div className="row">
        <div className = "mt-10">
          <VideoLibraryIcon
            style={{ "font-size": "-webkit-xxx-large" }}
          />
          <CheckCircleIcon style={{ "font-size": "-webkit-xxx-large" }} />
          <CancelRoundedIcon style={{ "font-size": "-webkit-xxx-large" }} />
          <AlbumOutlinedIcon style={{ "font-size": "-webkit-xxx-large" }} />
          </div>
          </div>
          
          <span> Preview </span>
          
          <span> SAVE THIS RECORDING </span>
          
          <span> DISCARD THIS </span>
          
          <span> RECORD AGAIN </span>
        </div>
        
        <div className="row">
        <div className="col-xs-4 col-md-4">
          <button > UPLOAD </button></div>
          <div className="col-xs-4 col-md-4 text-right">
          <button>BROWSE SAVED RECORDING AND UPLOAD</button>
        </div>
        </div>
    
        </React.Fragment>
    )
}

export default FooterIcons;