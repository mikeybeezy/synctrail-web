import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch  } from 'react-redux';
import { Button } from 'react-bootstrap';
import { selectPicker, fileUpload, checkBox } from '../../../shared/form-elements';
import { textInput, datePicker } from 'shared-lib/src/form-elements';
import { guarantorValidation } from 'shared-lib/src/validation';
import { reduxForm, Field, change } from "redux-form";
import moment from "moment";

function GuardForm(props) {
  const dispatch = useDispatch();
  const { handleSubmit, initialize, formStatus, guardSchedule } = props
  const clientData = useSelector(state => state.schedule.clientData);  
  useEffect(() => {
    if(formStatus === "newForm") {
      dispatch(change("guards_schedule", "ongoing", false))
    }
  }, []);

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
        <div className="col-md-5">
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
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <div className="form-check form-switch mt-4">
            <Field
              name="ongoing"
              type="checkbox"
              component="input"
              className="form-check-input"
            />
            <label className="form-check-label">Ongoing</label>
          </div>
        </div>
        <div className="col-md-5">
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
          {clientData && clientData.tours.map((data, key) => {
            return (
              <label key={key} className="checkgox-div">
                <Field name="tour_id" component="input" type="radio" value={data.id.toString()}  />
                <span className="checkbox-name">{data.name}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="mb-3 mt-4 form-footer">
        <Button variant="primary" type="submit">
          {formStatus === "newForm" ? 'Save' : 'Update'}
        </Button>
        <Link to="/admin/guard/schedule/list" className="px-3">
          <Button variant="default">Cancel</Button>
        </Link>
      </div>
    </form>
  );
}


GuardForm =  reduxForm({
  form: 'guards_schedule',
  validate: guarantorValidation
})(GuardForm);

GuardForm = connect(
  state => ({ initialValues: state.schedule.editSchedule }),
)(GuardForm)

export default GuardForm