import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { trackActions } from '../../../actions';
import GuardLocation from './guardLocation'
import { userConstants } from '../../../constants';
import moment from 'moment';

function TrakGuardLocation(props) {
  const dispatch = useDispatch();
  const { 
    clientList, 
    clientLocations, 
    allGuards, 
    centerLocation,
    arrayLocation 
  } = props
  const [ id, setId ] = useState()
  const [ guardDetails, setGuardDetails ] = useState()
  const [ showMap, setShowMap ] = useState(false)
  
  useEffect(() => {
    dispatch(trackActions.getAllClients());
  }, []);

  const activeMap = () => {
    setShowMap(true)
  }

  const checkValue = (event) => {
    dispatch(trackActions.getClientLocation(event.target.value));
  } 

  const checkLocationValue = (event) => {
    dispatch(trackActions.getGuards(event.target.value, activeMap));
  }

  const handleRow = (id) => {
    setId(id)
    const filterGuard = allGuards && allGuards.find(x => x.guard_profile_id === id)
    setGuardDetails(filterGuard)
    dispatch({type: userConstants.FILTER_GUARD_PROIFLE, payload: id});
  }
  
  useEffect(() => {
    let filterGuard = allGuards && allGuards[0];
    const id = filterGuard && filterGuard.guard_profile.id
    setId(id)
    setGuardDetails(filterGuard && filterGuard)
  }, [allGuards])
  
  // if (props.loading) {
  //   return <div className="page_loading">Loading..</div>
  // }

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

      {showMap && (
        <div>
          <GuardLocation 
            guardLocation={arrayLocation && arrayLocation}
            centerPointer={centerLocation && centerLocation}
          />
          <div className="row">
            <div className="col-md-6">
              <h6 className="py-2">Assigned Guard List</h6>
              <div className="scroll_guard">
                <div className="table-header">
                  <div className="index_value">S.No</div>
                  <div className="guard_name">Guard Name</div>
                </div>
                {allGuards && allGuards.length > 0 ?
                  allGuards.filter((d,i,b) => b.findIndex(t => (t.guard_profile.id === d.guard_profile.id))==i).map((data, index) => {
                    return (
                      <div
                        className={id === data.guard_profile.id ? "table_body highligh_guard" : "table_body"}
                        key={data.id} 
                        onClick={ () => handleRow(data.guard_profile.id)}
                      >
                        <div className="index_value">{index + 1}</div>
                        <div className="guard_name">{data.guard_profile.name} {data.guard_profile.id} </div>
                      </div>
                    )
                  })
                : 
                  <div className="empty_content">No data yet </div>
                }
              </div>
            </div>
            <div className="col-md-6">
             {guardDetails && guardDetails.guard_sessions.map((se ,i ) => {
               if(moment().isSame(se.schedule_start_at, 'day')){
                 return (
                   <div className="mt-3">
                     <div className="form-group">
                       <label>Sign-In Time</label>
                       <div className="time-div">{moment(se.schedule_start_at).format('hh:mm A')}</div>
                     </div>
                     <div className="form-group">
                       <label>Sign-In Time</label>
                       <div className="time-div">{moment(se.schedule_end_at).format('hh:mm A')}</div>
                     </div>
                   </div>
                 )
               }
             })}
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.track.loading,
    clientList: state.track.clientList,
    clientLocations: state.track.clientLocations,
    allGuards: state.track.allGuards,
    arrayLocation: state.track.arrayLocation,
    centerLocation: state.track.centerLocation,
  };
};

export default connect(mapStateToProps, {trackActions })(TrakGuardLocation);
