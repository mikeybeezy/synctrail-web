import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch  } from 'react-redux';
import { Button } from 'react-bootstrap';
import { selectPicker, fileUpload, checkBox, radioInput } from '../../../shared/form-elements';
import { textInput, datePicker } from 'shared-lib/src/form-elements';
import { scheduleValidation } from 'shared-lib/src/validation';
import { reduxForm, Field, change } from "redux-form";
import moment from "moment";

function ScheduleForm(props) {
  const dispatch = useDispatch();
  const { handleSubmit, initialize, loading, formStatus, guardSchedule, editSchedule } = props
  const clientData = useSelector(state => state.schedule.clientData); 

  useEffect(() => {
    if(formStatus === "newForm") {
      initialize({ ScheduleForm: "", days_shift: "" })
    }else {
      initialize({
        days_shift: editSchedule && editSchedule.days_shift,
        tour_id: editSchedule && editSchedule.tour_id.toString(),
        guard_profile_id: editSchedule && editSchedule.guard_profile_id,
        client_id: editSchedule && editSchedule.client_id,
        location_id: editSchedule && editSchedule.location_id,
        from_date: editSchedule && editSchedule.from_date,
        to_date: editSchedule && editSchedule.to_date,
        ongoing: editSchedule && editSchedule.ongoing,
      });
    }
  }, []);

  const clearForm = () => {
     initialize({ days_shift: "" })
  }

  if (loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Field 
            name="guard_profile_id" 
            component={selectPicker} 
            label="Select Guard Id" 
            options={guardSchedule && guardSchedule.guard_profile} 
            placeholder="Select guard..."
            optionname="guardProfile"
          />
        </div>
        <div className="col-md-6">
          <Field 
            name="client_id" 
            component={selectPicker} 
            label="Select Client" 
            options={guardSchedule && guardSchedule.client_list}  
            placeholder="Select client..."
            optionname="clientId"
            getClientId={editSchedule && editSchedule.client_id} 
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Field 
            name="location_id" 
            component={selectPicker} 
            label="Select Site Id" 
            options={clientData && clientData.locations} 
            placeholder="Select site..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h5 className="py-3">Choose Work Shift</h5>
          <Field name="days_shift" component={checkBox} options={guardSchedule && guardSchedule.work_shift} /> 
        </div>
      </div>
      <div className="row d-flex align-items-center mt-3">
        <div className="col-md-6">
          <Field
            name="from_date"
            normalize={value => (value ? moment(value).format('DD-MM-YYYY') : null)}
            component={datePicker}
            label="From Date"
            placeholder="00/00/0000..."
            showMonthDropdown
            showYearDropdown
            inputValueFormat="DD-MM-YYYY"
          />
        </div>
        
        <div className="col-md-6">
          <Field
            name="to_date"
            normalize={value => (value ? moment(value).format('DD-MM-YYYY') : null)}
            component={datePicker}
            label="End Date"
            placeholder="00/00/0000..."
            showMonthDropdown
            showYearDropdown
            inputValueFormat="DD-MM-YYYY"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          {clientData && clientData.tours.length > 0 ? <h5 className="py-2">Set Tour Route</h5> : null}
          <div className="d-flex align-items-center">
            {clientData && clientData.tours.map((data, key) => {
              return (
                <label key={key} className="checkgox-div d-flex align-items-center">
                  <Field name="tour_id" component="input" type="radio" value={data.id.toString()}/>
                  <span className="checkbox-name">{data.name}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mb-3 mt-4 form-footer">
        <Button variant="primary" type="submit">
          {formStatus === "newForm" ? 'Save' : 'Update'}
        </Button>
        <Link to="/admin/guard/schedule/list" className="px-3" onClick={() => clearForm()}>
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}


ScheduleForm =  reduxForm({
  form: 'guards_schedule',
  validate: scheduleValidation
})(ScheduleForm);


export default ScheduleForm