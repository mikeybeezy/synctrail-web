import React from "react";
import { Field } from "redux-form";
import { textInput, selectField } from '../../../../shared/form-elements'


const location_d = [{'id' :1, 'name': 'testing'}]


class renderWorkspace extends React.Component {
  render() {
    const { fields, workspace, locationData, formStatus } = this.props;
    const removeName = (index, location) => {
      if (formStatus === 'editForm') {
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
              <div className="row d-flex align-items-center">
                <div className="col-lg-11">
                  <Field 
                     name={`${location}.location_id`}
                    component={selectField} 
                    label="Select Location" 
                    options={locationData} 
                    placeholder="Select Location"
                    location={location}
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
          );
        })}

        <div className="py-2">
          <div  onClick={() => fields.push({})} className="addmore_btn"> + Add Site</div>
        </div>
      </div>
    );
  }
}

export default renderWorkspace;
