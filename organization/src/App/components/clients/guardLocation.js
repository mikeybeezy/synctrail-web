import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { clientActions } from '../../../actions';
import CustomMarker from './marker'


function CustomMarkers(props) {
  const { guardLocation } = props

  console.log("===============")
  console.log(guardLocation)
  console.log("===============")
   
  const dispatch = useDispatch();
  const [CenterMarker, setCenterMarker] = useState({lat: 13.046640,lng: 80.111649});
  
  useEffect(() => {
    dispatch(clientActions.getGuardLocation());
  }, []);
  return (
    <div style={{ height: "86vh", width: "100%", borderRadius: 4}}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBMNssCXhm3S4YiuN6vYDk3jv1iFzUiByU"
        }}
        defaultCenter={CenterMarker}
        defaultZoom={16}
      >
        {guardLocation && guardLocation.map(item => {
          if (item.locations.length !== 0) {
            return item.locations.map(i => {
              return (
                <CustomMarker  key={i.id} lat={i.latitude} lng={i.longitude} />
                
              );
            });
          }
        })}
      </GoogleMapReact>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.client.loading,
    guardLocation: state.client.guardLocation
  };
};

export default connect(mapStateToProps, {clientActions })(CustomMarkers);
