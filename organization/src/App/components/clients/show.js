import React, {useEffect} from 'react';
import { connect,  useDispatch } from 'react-redux';
import { clientActions } from '../../../actions';
import { useParams } from 'react-router-dom';
import SiteDetails from "../sites/list";
import TourDetails from "../tours/list";
import OrderTemplateDetails from "../order-template/list";

function ClientShow(props) {
  const { currentClient } = props
  const dispatch = useDispatch();
  const { client_id } = useParams();

  useEffect(() => {
    dispatch(clientActions.editClient(client_id));
  }, []);

  return (
    <div>
      <div  className="container client-list">
        <h5 className="mb-2">Client Details</h5>
        <div><span>Business Name - </span> {currentClient && currentClient.business_name}</div>
        <div><span>Email - </span> {currentClient && currentClient.email}</div>
        <div><span>Phone Number - </span> {currentClient && currentClient.phone_number}</div>
      </div>
      <SiteDetails />
      <TourDetails />
      <OrderTemplateDetails clientId={client_id}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentClient: state.client.editClient
  }
};

export default connect(mapStateToProps,{ clientActions })(ClientShow);
