import React, {useState, useEffect} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Button , Table} from 'react-bootstrap';
import { siteActions } from '../../../actions';
import { Popup } from '../../../utils-components';

function SiteList(props) {
	const dispatch = useDispatch();
  const { client_id } = useParams();
  const { siteList } = props

  useEffect(() => {
    dispatch(siteActions.getSiteData(client_id));
  }, []);

  /* Popup Modal */
  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => {
    setPopUp({show: false, id: null});
  }

  const handleShow = (id) => setPopUp({show: true, id});

  const handleDelete = () => {
    dispatch(siteActions.destroySite(client_id, popup.id));
    handleClose();
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-3">
        <h3>Sites List</h3>
        <Link to={{ pathname: `/admin/clients/${client_id}/site/new`}}>
          <Button variant="primary">Add Site</Button>
        </Link>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Code</th>
            <th>Address Line 1</th>
            <th>Contact name</th>
            <th>Contact phone</th>
            <th>Contact email</th>
            <th style={{width: '5%'}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {siteList && siteList.length > 0 ? 
            siteList.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.code}</td>
                  <td>{data.address_line_1}</td>
                  <td>{data.contact_person_full_name}</td>
                  <td>{data.contact_person_phone_number}</td>
                  <td>{data.contact_person_email}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to={`/admin/clients/${client_id}/site/${data.id}/edit`}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </Link>
                      <div onClick={() => handleShow(data.id)} className="ml-10 cursor-pointer">
                       <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </div>
                    </div>
                  </td>
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
      {popup.show &&
        <Popup
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.site.loading,
    siteList: state.site.siteList
  };
};

export default connect(mapStateToProps, {siteActions })(SiteList);
