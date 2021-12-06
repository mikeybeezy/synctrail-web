import React, {useState, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { scheduleActions } from '../../../actions';
import ScheduleForm from "../guard-schedule/form";

function GuardScheduleEdit(props) {
  const dispatch = useDispatch();
  const { guardSchedule, editSchedule } = props
  const { schedule_id } = useParams();

  useEffect(() => {
    dispatch(scheduleActions.scheduleInitialData());
    dispatch(scheduleActions.scheduleEdit(schedule_id));
  }, []);
  
  const showResults = (values) => {
    dispatch(scheduleActions.updateGuardSchedule(schedule_id, values));
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  console.log(editSchedule)
  console.log(editSchedule)
  console.log(editSchedule)
  console.log(editSchedule)

  return (
    <div className="container">
      <ScheduleForm 
        onSubmit={showResults} 
        formStatus="editForm" 
        guardSchedule={guardSchedule && guardSchedule}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.schedule.loading,
    guardSchedule: state.schedule.guardSchedule,
    editSchedule: state.schedule.editSchedule,
  }
};

export default connect(mapStateToProps,{ scheduleActions })(GuardScheduleEdit);
