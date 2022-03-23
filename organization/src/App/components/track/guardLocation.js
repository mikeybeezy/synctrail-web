import React, {useState} from 'react';

import { 
  LoadScript, 
  GoogleMap, 
  Marker,
  InfoWindow
} from "@react-google-maps/api"; 
import icons0 from '../../../images/0.png'
import icons1 from '../../../images/1.png'
import icons2 from '../../../images/2.png'
import icons3 from '../../../images/3.png'
import icons4 from '../../../images/4.png'

const containerStyle = {
  width: '100%',
  height: '320px'
};

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true;
    const isBrowser = typeof document !== "undefined"; 
    const isAlreadyLoaded =
      window.google &&
      window.google.maps &&
      document.querySelector("body.first-hit-completed"); 
    if (!isAlreadyLoaded && isBrowser) {
      // @ts-ignore
      if (window.google && !cleaningUp) {
        console.error("google api is already presented");
        return;
      }
      this.isCleaningUp().then(this.injectScript);
    }
    if (isAlreadyLoaded) {
      this.setState({ loaded: true });
    }
  }
}

function GuardLocation({ guardLocation, centerPointer, allGuards  }) {


  const [activeMarker, setActiveMarker] = useState(false);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  }

  return (
    <div className="site_drawing_map">
      <LoadScriptOnlyIfNeeded
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}
        language="it"
        region="us"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerPointer}
          zoom={15}
          version="weekly"
        >
          <Marker position={centerPointer} />
          { allGuards && allGuards.map((data, i) => {
            console.log(data.guard_session_location)
            return (
              data.guard_session_location && data.guard_session_location.locations.slice(0).slice(-90).map((pos, i) => {
                const position = {lat: pos.latitude, lng: pos.longitude }
                let  icons = ''
                if(i === 0) {
                  icons = icons0
                }else if(i === 1) {
                  icons = icons1
                }else if(i === 2) {
                  icons = icons2
                }else if(i === 3) {
                  icons = icons3
                }else if(i === 4) {
                  icons = icons4
                }
                return(
                  <Marker 
                    key={i} 
                    position={position} 
                    icon={icons}
                    onClick={() => handleActiveMarker(pos.latitude)}
                  >
                    {activeMarker === pos.latitude ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div>{data && data.guard_profile.first_name} {data && data.guard_profile.last_name}</div>
                      </InfoWindow>
                      ) : null
                    }
                  </Marker>
                )
              })
            )
          })
        }
        </GoogleMap>
      </LoadScriptOnlyIfNeeded>
    </div>
  );
}

export default GuardLocation
