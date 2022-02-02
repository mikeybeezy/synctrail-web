import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { trackActions } from '../../../actions';
import GuardLocation from './guardLocation'

function TrakGuardLocation(props) {
  const dispatch = useDispatch();
  const { clientList, clientLocations, allGuards } = props
  const [ id, setId ] = useState()
  const [ guardDetails, setGuardDetails ] = useState()
  
  useEffect(() => {
    dispatch(trackActions.getAllClients());
  }, []);

  const checkValue = (event) => {
    dispatch(trackActions.getClientLocation(event.target.value));
  } 

  const checkLocationValue = (event) => {
    dispatch(trackActions.getGuards(event.target.value));
  }

  const handleRow = (id) => {
    setId(id)
    const filterData = allGuards && allGuards.filter((item) => item.guard_profile.id == id);
    setGuardDetails(filterData)
  }
  
  useEffect(() => {
    let filterGuard = allGuards && allGuards[0];
    const id = filterGuard && filterGuard.guard_profile.id
    setId(id)
    const filterData = allGuards && allGuards.filter((item) => item.guard_profile.id == id);
    setGuardDetails(filterData)
  }, [allGuards])

  return (
    <div className="container">
      <div className="row">
        {clientList && clientList.length > 0 ?
          <div className="col-md-6">
            <div className="form-group">
              <select className="form-control" onChange = { (e) => checkValue(e)}>
                <option value="">Select Client</option>
                {clientList.map((data, key) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.business_name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          : null
        }
        <div className="col-md-6">
          <div className="form-group">
            <select 
              className="form-control" 
              onChange = { (e) => checkLocationValue(e)}
              disabled={clientLocations ? false : true}
            >
              <option value="">Select Location</option>
              {clientLocations && clientLocations.map((data, key) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      {allGuards && allGuards.length > 0 ? 
        <div>
          <GuardLocation guardLocation={guardDetails && guardDetails}/>
          <div className="row">
            <div className="col-md-6">
              <h6 className="py-2">Assign Guard List</h6>
              <div className="scroll_guard">
                <div className="table-header">
                  <div className="index_value">S.No</div>
                  <div className="guard_name">Guard Name</div>
                </div>
                { allGuards && allGuards.map((data, index) => {
                  return (
                    <div
                      className={id === data.guard_profile.id ? "table_body highligh_guard" : "table_body"}
                      key={data.id} 
                      onClick={ () => handleRow(data.guard_profile.id)}
                    >
                      <div className="index_value">{index + 1}</div>
                      <div className="guard_name">{data.guard_profile.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="col-md-6">
              <h6 className="py-4"></h6>
              {guardDetails && guardDetails.map((data, i) => {
                return (
                  <div key={i}>
                    <div className="form-group">
                      <label className="mb-1">Start-In-Time</label>
                      <div className="time-div">{data && data.guard_sessions[0].schedule_start_at}</div>
                    </div>
                    <div className="form-group">
                      <label className="mb-1">Sign-Out-Time</label>
                      <div className="time-div">{data && data.guard_sessions[0].schedule_end_at}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        : null
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.track.loading,
    clientList: state.track.clientList,
    clientLocations: state.track.clientLocations,
    allGuards: state.track.allGuards,
  };
};

export default connect(mapStateToProps, {trackActions })(TrakGuardLocation);
