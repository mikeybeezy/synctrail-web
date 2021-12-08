import React, {useEffect, useState} from 'react';
import { connect,  useDispatch } from 'react-redux';
import { guardOrderActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GuardOrderForm from "../guard-orders/form";

function SiteNew(props) {
  const [ orderlist, setOrderList] = useState([]);
  const dispatch = useDispatch();
  const { schedule_id } = useParams();

  useEffect(() => {
   dispatch(guardOrderActions.getOrderTemplate(schedule_id));
  }, []);
  
  const handleGuard = (values) => { setOrderList(values)}
  
  const handleSubmitValue = () => {
    dispatch(guardOrderActions.newOrders(schedule_id, {guard_orders: orderlist} ));
  }

  return (
    <div className="container">
      <GuardOrderForm  formStatus="newForm" onSelectGuarntor={handleGuard} />
      <div className="mb-3 mt-4 form-footer">
        <Link to={`/admin/guard/schedule/${schedule_id}/orders`}>
          <Button variant="default">Cancel</Button>
        </Link>
        <Button variant="primary" onClick={handleSubmitValue} style={{marginLeft: '20px'}}> Save</Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
};


export default connect(mapStateToProps,{ guardOrderActions })(SiteNew);
