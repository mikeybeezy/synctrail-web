import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { scheduleActions } from '../../../actions';
import ScheduleForm from "../guard-schedule/form";

function GuardScheduleNew(props) {
  const dispatch = useDispatch();
  const { guardSchedule } = props

  useEffect(() => {
    dispatch(scheduleActions.scheduleInitialData());
  }, []);
  
  const showResults = (values) => {
    dispatch(scheduleActions.createGuardSchedule(values));
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <div className="container">
      <ScheduleForm 
        onSubmit={showResults} 
        formStatus="newForm" 
        guardSchedule={guardSchedule && guardSchedule}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.schedule.loading,
    guardSchedule: state.schedule.guardSchedule,
  }
};

export default connect(mapStateToProps,{ scheduleActions })(GuardScheduleNew);
