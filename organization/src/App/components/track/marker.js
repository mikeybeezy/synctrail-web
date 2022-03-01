import React from 'react';
import HumanMarker from '../../../images/humar-marker.png'

const markerStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, -100%)"
};

function CustomMarkers(props) {
  const { lat, lng} = props
  return (
    <div>
     <img style={{width: 40}} src={HumanMarker} alt="user pic"/>
     <div style={{color: 'red', fontSize: 20}}>{lat}</div>
    </div>
  );
}

export default CustomMarkers
