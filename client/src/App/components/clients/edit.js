import React, { useEffect } from 'react';
import {connect,  useDispatch, useSelector } from 'react-redux';
import ClientForm from "../clients/form";
import { Link } from 'react-router-dom';

function ClientNew(props) {
  const dispatch = useDispatch();
  const showResults = (values) => {
    console.log(values)
  }

  return (
    <div className="container">
      <ClientForm onSubmit={showResults}
        newForm="newForm"
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
};

export default connect(mapStateToProps,{ })(ClientNew);
