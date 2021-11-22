import React from "react";
import { Field } from "redux-form";
import { textInput, selectField } from '../../../../shared/form-elements'

class renderWorkspace extends React.Component {
  render() {
    const { fields, workspace, roles, editForm } = this.props;
    const removeName = (index, location) => {
      if (editForm === 'editForm') {
        this.props.change(location + '._destroy', true)
        const className = index + 'findClass_row'
        const currentClass = document.getElementsByClassName(className)
        for (let i = 0; i < currentClass.length; i++) {
          currentClass[i].classList.toggle('hidden')
        }
      } else {
        fields.remove(index)
      }
    }

    return (
      <div>
        {fields.map((location, index) => {
          return (
            <div key={index} className={index + "findClass_row"}>
              <div className="row-space">
                <div className="row d-flex align-items-center mb-3">
                  <div className="col-lg-6">
                    <Field
                      name={`${location}.name`}
                      type="text"
                      component={textInput}
                      label="Site Name"
                      placeholder="Site name..."
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name={`${location}.code`}
                      type="number"
                      component={textInput}
                      label="Site Number"
                      placeholder="Site number..."
                    />
                  </div>
                </div>
                <div className="row d-flex align-items-center mb-3">
                  <div className="col-lg-4">
                    <Field
                      name={`${location}.contact_person_full_name`}
                      type="text"
                      component={textInput}
                      label="Name"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name={`${location}.contact_person_phone_number`}
                      type="number"
                      component={textInput}
                      label="Phone"
                      placeholder="Phone..."
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name={`${location}.contact_person_email`}
                      type="text"
                      component={textInput}
                      label="Email"
                      placeholder="Email..."
                    />
                  </div>
                </div>
                <div className="row d-flex align-items-center">
                  <div className="col-lg-6">
                    <Field
                      name={`${location}.address_line_1`}
                      type="text"
                      component={textInput}
                      label="Address Line 1"
                      placeholder="Address..."
                    />
                  </div>
                  <div className="col-lg-5">
                    <Field
                      name={`${location}.address_line_2`}
                      type="text"
                      component={textInput}
                      label="Address Line 2"
                      placeholder="Address..."
                    />
                  </div>
                  <div className="col-lg-1">
                    <div key={index} style={{marginTop: '25px'}}>
                      <div onClick={() => removeName(index, location)} className="remove_btn">Remove</div>
                    </div>
                  </div>
                </div>
                 <div className="hidden">
                  <Field
                    name={`${location}._destroy`}
                    component={textInput}
                    key={index}
                    removeClass="removeClass"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div className="py-2">
          <div  onClick={() => fields.push({})} className="addmore_btn"> + Add More</div>
        </div>
      </div>
    );
  }
}

export default renderWorkspace;
