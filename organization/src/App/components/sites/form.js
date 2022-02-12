import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { textInput, checkBox } from 'shared-lib/src/form-elements';
import { connect, useDispatch, useSelector } from 'react-redux';
import { siteValidation } from 'shared-lib/src/validation';
import { reduxForm, Field, change } from "redux-form";
import Map from "./map";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY);
Geocode.setLanguage("en");

function LocationForm(props) {
  const dispatch = useDispatch();
  const editSite = useSelector(state => state.site.editSite); 
  const { handleSubmit, initialize, formStatus , client_id} = props
  const [ paths, setPaths ] = useState([])
  const [ addr1, setAddr1 ] = useState('')
  const [ addr2, setAddr2 ] = useState('')
  const [ centerPoint, setCenterPoint ] = useState({lat: 12.8797, lng: 121.7740})

  useEffect(() => {
    if(formStatus === "newForm") {
      initialize({ LocationForm: "" })
    }else {
      setPaths(editSite && editSite.geofence_data)
      dispatch(change("lform", "geofence_data", editSite && editSite.geofence_data))
      handlFormAddress(editSite && (editSite.address_line_1 + editSite.address_line_2))
    }
  }, []);

  const handlePaths = (paths) => {
    setPaths(paths)
    dispatch(change("lform", "geofence_data", paths))
  }

  const handleAddressOne = (event) => {
    setAddr1(event.target.value)
    handlFormAddress(addr1 + addr2)
  }

  const handleAddressTwo = (event) => {
    setAddr2(event.target.value)
    handlFormAddress(addr1 + addr2)
  }

  const handlFormAddress = (address) => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenterPoint({lat: lat, lng: lng})
      },
      (error) => {
        console.log("Map - Find Lat & Lon: ")
        console.log(error)
      }
    );
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
              label="Address line 1" 
              placeholder="Address line 1..."
              onBlur={e => handleAddressOne(e)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <Field 
              name="address_line_2" 
              type="text" 
              component={textInput} 
              label="Address line 2" 
              placeholder="Address line 2..."
              onBlur={e => handleAddressTwo(e)}
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
          apiKey="AIzaSyAA-uRhI-Xv4P3naESnuYo5FccgccEfbgI"
          center={centerPoint}
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
  form: 'lform',
  validate: siteValidation
})(LocationForm);

LocationForm = connect(
  state => ({ initialValues: state.site.editSite}),
)(LocationForm)

export default LocationForm