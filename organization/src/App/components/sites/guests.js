import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Table} from 'react-bootstrap';
import { siteActions } from '../../../actions';
import moment from 'moment';

function SiteList(props) {
	const dispatch = useDispatch();
  const { client_id, site_id } = useParams();
  const { guestes } = props

  useEffect(() => {
    dispatch(siteActions.historyGuests(site_id));
  }, []);

  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-2">
        <h5>Guests History</h5>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th className="text-center" style={{width: '3%'}}>S.No</th>
            <th width="15%">First Name</th>
            <th width="20%">Email</th>
            <th>Phone Number</th>
            <th>Contact Person</th>
            <th>Department Name</th>
            <th>Company</th>
            <th>Address</th>
            <th>Check In</th>
            <th>Sign Out</th>
          </tr>
        </thead>
        <tbody>
          {guestes && guestes.length > 0 ? 
            guestes.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.first_name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.contact_person}</td>
                  <td>{data.department_name}</td>
                  <td>{data.company}</td>
                  <td>{data.full_address}</td>
                  <td>{moment(data.checkin_at).format('DD-MM-YYYY hh:mm A')}</td>
                  <td>{ data.checkout_at ? moment(data.checkout_at).format('DD-MM-YYYY hh:mm A') : '-'}</td>
                </tr>
              )
            })
            : 
            <td colSpan="20" className="text-center">
              <div className="py-3">No data yet</div>
            </td>
          }
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.site.loading,
    guestes: state.site.guestes
  };
};

export default connect(mapStateToProps, {siteActions })(SiteList);
