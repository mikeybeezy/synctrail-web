import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import CustomMarker from './marker'

function GuardLocation(props) {
  const { guardLocation } = props 
  const [CenterMarker, setCenterMarker] = useState({lat: 13.046640,lng: 80.111649});
  return (
    <div className="google_map_frame">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBMNssCXhm3S4YiuN6vYDk3jv1iFzUiByU"
        }}
        defaultCenter={CenterMarker}
        defaultZoom={16}
      >
       {guardLocation && guardLocation.map(item => {
          return (
            item.guard_profile.guard_locations.map((data, i) => {
              return (
                  <CustomMarker  key={i} lat={data.latitude} lng={data.longitude} />
                )
             })
            )
        })}
      </GoogleMapReact>
    </div>
  );
}

export default GuardLocation

