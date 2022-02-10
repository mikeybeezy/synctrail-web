import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Table} from 'react-bootstrap';
import { siteActions } from '../../../actions';
import moment from 'moment';

function SiteList(props) {
  const dispatch = useDispatch();
  const { client_id, site_id } = useParams();
  const { reports } = props

  useEffect(() => {
    dispatch(siteActions.historyReports(site_id));
  }, []);
  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-2">
        <h5>Incident Reports History</h5>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th className="text-center" style={{width: '3%'}}>S.No</th>
            <th width="20%">Incident Type</th>
            <th width="20%">Summary</th>
            <th width="40%">Description</th>
            <th width="20%">Created at</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.length > 0 ? 
            reports.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.incident_type}</td>
                  <td>{data.summary}</td>
                  <td>{data.description}</td>
                   <td>{moment(data.created_at).format('DD-MM-YYYY hh:mm A')}</td>
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
    reports: state.site.reports
  };
};

export default connect(mapStateToProps, {siteActions })(SiteList);
