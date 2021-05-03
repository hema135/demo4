import React from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SubscriptionsSharpIcon from '@material-ui/icons/SubscriptionsSharp';

const Welcome = () => {
  return (
  <div className = "w-25 p-3">
    <h2>THANK YOU</h2>
    <CheckBoxIcon />
    <h2>WE HAVE RECEIVED <br />YOUR VIDEO/AUDIO <br />&<br /> WE WILL GET BACK SOON</h2>
    <p>CHECK OUR EXPERT VIDEOS</p>
    <SubscriptionsSharpIcon />
    <SubscriptionsSharpIcon />
    <SubscriptionsSharpIcon />


  </div>
  )
}

export default Welcome;