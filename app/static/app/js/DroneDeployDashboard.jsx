import React from 'react';
import $ from 'jquery';
import { _ } from './classes/gettext';
import DDProjectList from "./components/DDProjectList"

class DroneDeployDashboard extends React.Component {
    
  render() {

    return (

      <>
        <div className="DDproject"> 
            <DDProjectList />
        </div>  
      </>

    );
  }
}

$(function(){
    $("[dronedeploy-page]").each(function(){
        window.ReactDOM.render(<DroneDeployDashboard/>, $(this).get(0));
    });
});

export default DroneDeployDashboard;
