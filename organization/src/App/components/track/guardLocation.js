import { 
  LoadScript, 
  GoogleMap, 
  Marker 
} from "@react-google-maps/api";

import HumanMarker from '../../../images/humar-marker.png'
const containerStyle = {
  width: '100%',
  height: '350px'
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

function GuardLocation({ guardLocation, centerPointer  }) {
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
          zoom={10}
          version="weekly"
        >
        <Marker position={centerPointer} />
         {guardLocation &&
            guardLocation.map((pos, key) => {
              const position = {lat: pos.latitude, lng: pos.longitude }
              return <Marker 
                key={key} 
                position={position} 
                icon={HumanMarker}
              />
            })}
        </GoogleMap>
      </LoadScriptOnlyIfNeeded>
    </div>
  );
}

export default GuardLocation