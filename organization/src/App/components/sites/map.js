import React, { 
  useState, 
  useRef, 
  useEffect, 
  useCallback 
} from "react";
import { 
  LoadScript, 
  GoogleMap, 
  DrawingManager, 
  Polygon, 
  Marker 
} from "@react-google-maps/api";

const libraries = ["drawing"];
const containerStyle = {
  width: '100%',
  height: '350px'
};

const options = {
  drawingControl: true,
  drawingControlOptions: {
    drawingModes: ["polygon"]
  },
  polygonOptions: {
    fillColor: `#2196F3`,
    strokeColor: `#2196F3`,
    fillOpacity: 0.5,
    strokeWeight: 2,
    clickable: true,
    editable: true,
    draggable: true,
    zIndex: 1
  }
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

function Map({ onChange, apiKey, center, paths = [], point }) {
  const [path, setPath] = useState();
  const [state, setState] = useState({
    drawingMode: "polygon"
  });
  useEffect(() => {
    setPath(paths);
  }, [paths]);

  const noDraw = () => {
    setState(function set(prevState) {
      return Object.assign({}, prevState, {
        drawingMode: "maker"
      });
    });
  };

  const onPolygonComplete = React.useCallback(
    function onPolygonComplete(poly) {
      const polyArray = poly.getPath().getArray();
      let paths = [];
      polyArray.forEach(function(path) {
        paths.push({ lat: path.lat(), lng: path.lng() });
      });
      setPath(paths);
      console.log("onPolygonComplete", paths);
      point(paths);
      noDraw();
      poly.setMap(null);
    },
    [point]
  );

  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
      point(nextPath);
    }
  }, [setPath, point]);

  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );
  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);
  return (
    <div className="site_drawing_map">
      <LoadScriptOnlyIfNeeded
        id="script-loader"
        googleMapsApiKey={apiKey}
        libraries={libraries}
        language="it"
        region="us"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          version="weekly"
        >
          {path && path.length === 0 ? (
            <DrawingManager
              drawingMode={state.drawingMode}
              options={options}
              onPolygonComplete={onPolygonComplete}
              editable
              draggable
              onMouseUp={onEdit}
              onDragEnd={onEdit}
            />
          ) : (
            <Polygon
              options={{
                fillColor: `#2196F3`,
                strokeColor: `#2196F3`,
                fillOpacity: 0.5,
                strokeWeight: 2
              }}
              editable
              draggable
              path={path}
              onMouseUp={onEdit}
              onDragEnd={onEdit}
              onLoad={onLoad}
              onUnmount={onUnmount}
            />
          )}
         <Marker  position={center} />
          {path &&
            path.map((pos, key) => {
              return <Marker key={key} label={"" + key} position={pos} />;
            })}
        </GoogleMap>
      </LoadScriptOnlyIfNeeded>
    </div>
  );
}

export default Map