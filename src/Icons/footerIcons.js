// import React from "react";
// import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
// import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import Welcome from '../popup/welcome';
 


// const FooterIcons = () => {
//     return (
//         <React.Fragment>
//         <div className="demoicons">
//         <div className="row">
//         <div className = "mt-10">
//           <VideoLibraryIcon
//             style={{ "font-size": "-webkit-xxx-large" }}
//           />
//           <CheckCircleIcon style={{ "font-size": "-webkit-xxx-large" }} />
//           <CancelRoundedIcon style={{ "font-size": "-webkit-xxx-large" }} />
//           <AlbumOutlinedIcon style={{ "font-size": "-webkit-xxx-large" }} />
//           </div>
//           </div>
          
//           <span> Preview </span>
          
//           <span> SAVE THIS RECORDING </span>
          
//           <span> DISCARD THIS </span>
          
//           <span> RECORD AGAIN </span>
//         </div>
        
//         <div className="row">
//         <div className="col-xs-4 col-md-4">
//         <Popup trigger={<button> UPLOAD</button>} position="right center">
//     <div><Welcome /></div>
//   </Popup>
//           </div>
//           <div className="col-xs-4 col-md-4 text-right">
//           <button>BROWSE SAVED RECORDING AND UPLOAD</button>
//         </div>
//         </div>
    
//         </React.Fragment>
//     )
// }

// export default FooterIcons;



import React from "react";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import AlbumOutlinedIcon from "@material-ui/icons/AlbumOutlined";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Welcome from '../popup/welcome';


const FooterIcons = (props) => {
    return (
        <React.Fragment>
        <div className="row icon">
          <div className="col-md-3 alignCenter">
            <VideoLibraryIcon
                    style={{ "font-size": "-webkit-xxx-large" }}
                  /><br/>
            <b> PREVIEW </b>
          </div>
          {/* mt-10 */}
          <div className="col-md-3 alignCenter">
            <CheckCircleIcon style={{ "font-size": "-webkit-xxx-large" }} /><br/>
            <b> SAVE THIS RECORDING </b>
          </div>
          <div className="col-md-3 alignCenter" onClick = {props.onDiscard}>
            <CancelRoundedIcon style={{ "font-size": "-webkit-xxx-large" }} /><br/>
            <b> DISCARD THIS </b>
          </div>
          <div className="col-md-3 alignCenter">
            <AlbumOutlinedIcon style={{ "font-size": "-webkit-xxx-large" }} /><br/>
            <b> RECORD AGAIN </b>
          </div>
        </div>

        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4" style={{"padding": "0% 4%"}}>
            <Popup trigger={<button> UPLOAD</button>} position="right center">
              <div><Welcome /></div>
            </Popup>
              </div>
              <div className="col-md-6">
              <button>BROWSE SAVED RECORDING AND UPLOAD</button>
            </div>
        </div>
    
        </React.Fragment>
    )
}

export default FooterIcons;