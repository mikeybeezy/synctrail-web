import React, { useState } from "react";
import { connect,  useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { chatActions } from '../../../actions';
import { Link } from 'react-router-dom';
import Select from "react-select";

function AutoSearch(props) {
  const { organizationUser } = props
  const dispatch = useDispatch();
  const [ selectValue, setSelectValue] = useState([]);
  const [ error, setErorr] = useState();

  const handleChange = (values) => {
    setSelectValue(values)
    setErorr('')
  };

  const handleConversation = () => {
    if(selectValue != "") {
      dispatch(chatActions.createConversation({conversation_participants: selectValue}));
    }else {
      setErorr('please Select Users')
    }
  }

  function MakeOption(x) {
    return { value: x.id, label: x.username };
  }
  
  return (
    <div>
      <div className="histroy-header">
        <Select
          isMulti
          name="conversation"
          options={organizationUser && organizationUser.map(x => MakeOption(x))}
          // className="basic-multi-select"
          // classNamePrefix="select users"
          onChange={handleChange}
        />
        <Button variant="primary" size="sm" className="conversation-btn" onClick={handleConversation}> Start Conversation </Button>
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default AutoSearch;