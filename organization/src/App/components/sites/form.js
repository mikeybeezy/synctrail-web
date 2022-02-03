import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { textInput, checkBox } from 'shared-lib/src/form-elements';
import { siteValidation } from 'shared-lib/src/validation';
import { reduxForm, Field, change } from "redux-form";
import { connect, useDispatch, useSelector } from 'react-redux';
import Map from "./map";

const center = {
  lat: 38.9065495,
  lng: -77.0518192
};

function LocationForm(props) {
  const dispatch = useDispatch();
  const { handleSubmit, initialize, formStatus , client_id} = props
  const editSite = useSelector(state => state.site.editSite); 
  const [paths, setPaths] = useState([])

  useEffect(() => {
    if(formStatus === "newForm") {
      initialize({ LocationForm: "" })
    }else {
      setPaths(editSite && editSite.geofence_data)
      dispatch(change("locationform", "geofence_data", editSite && editSite.geofence_data))
    }
  }, []);

  const handlePaths = (paths) => {
    setPaths(paths)
    dispatch(change("locationform", "geofence_data", paths))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="py-2">Add Site</h5>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Field 
              name="name" 
              type="text" 
              component={textInput} 
              label="Site Name" 
              placeholder="Site name..."
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <Field 
              name="code" 
              type="number" 
              component={textInput} 
              label="Site Number" 
              placeholder="Site number..."
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Field 
              name="address_line_1" 
              type="text" 
              component={textInput} 
              label="Address Line 1" 
              placeholder="Address..."
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <Field 
              name="address_line_2" 
              type="text" 
              component={textInput} 
              label="Address Line 2" 
              placeholder="Address..."
            />
          </div>
        </div>
      </div>
      <h5 className="py-2">Contact Person</h5>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="contact_person_full_name" 
              type="text" 
              component={textInput} 
              label="Name" 
              placeholder="Name..."
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="contact_person_phone_number" 
              type="number" 
              component={textInput} 
              label="Phone" 
              placeholder="Phone..."
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Field 
              name="contact_person_email" 
              type="email" 
              component={textInput} 
              label="Email" 
              placeholder="Email..."
            />
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <Field
            name="geo_fence_enabled"
            id="geo_fence_enabled"
            component="input"
            type="checkbox"
          />
          <label style={{fontSize: 14, marginLeft: 10}}>Geo fence enabled</label>
        </div>
        <div className="google-map col-md-12">
         <Map
          apiKey={process.env.REACT_APP_MAP_API_KEY}
          center={center}
          paths={paths}
          point={paths => handlePaths(paths)}
        />
        <div className="row list_point">
          {paths.map((pos, key) => {
            return (
              <div key={key} className="col-md-3 mb-3">
                <div>
                  <div style={{fontSize: 12}}>Point #{key}</div>
                  <div style={{fontSize: 12}}>Latitude : {pos.lat}</div>
                  <div style={{fontSize: 12}}>Longitude : {pos.lng}</div>
                </div>
                <Button 
                  className="delet_point_btn"
                  onClick={() => {setPaths(paths.filter((_, i) => i !== key))}}
                >
                    Delete Point
                </Button>
              </div>
            );
          })}
        </div>
        </div>
      </div>
      <div className="mb-3 mt-4 form-footer">
        <Button 
          variant="primary" 
          type="submit"
        >
          {formStatus === "newForm" ? "Save" : "Update"}
        </Button>
        <Link to={`/admin/clients/${client_id}/sites`} className="px-3">
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}

LocationForm =  reduxForm({
  form: 'locationform',
  validate: siteValidation
})(LocationForm);

LocationForm = connect(
  state => ({ initialValues: state.site.editSite}),
)(LocationForm)

export default LocationForm