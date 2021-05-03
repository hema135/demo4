import React from "react";
import SportsHockeyIcon from "@material-ui/icons/SportsHockey";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";

const HeaderIcons = () => {
  return (
    <React.Fragment>
      <span className = "col-xs-6 col-md-6 text-right">
      <SportsHockeyIcon  /> </span>
      <span className= "col-xs-6 col-md-6 text-right">
      <AccountBoxIcon  />
      <SettingsPowerIcon  />
      </span>
      <h4 className = "col-xs-12 col-md-12 text-center">Demo - 4</h4>
    </React.Fragment>
  );
};

export default HeaderIcons;
