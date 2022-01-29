import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Button , Table} from 'react-bootstrap';
import { clientActions } from '../../../actions';
import { Popup } from '../../../utils-components';

function ClientList(props) {
	const dispatch = useDispatch();
  const { clientList } = props

  useEffect(() => {
    dispatch(clientActions.getClientData());
  }, []);

  /* Popup Modal */
  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => {
    setPopUp({show: false, id: null});
  }

  const handleShow = (id) => setPopUp({show: true, id});

  const handleDelete = () => {
    dispatch(clientActions.destroyClient(popup.id));
    handleClose();
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-3">
        <h3>Clients</h3>
        <Link to="/admin/clients/new">
          <Button variant="primary" size="sm">Add Client</Button>
        </Link>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Business Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address Line 1</th>
            <th>Contact name</th>
            <th>Contact phone</th>
            <th>Contact email</th>
            <th style={{width: '5%'}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientList && clientList.length > 0 ? 
            clientList.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/admin/clients/${data.id}/show`}  className="link-list">
                      {data.business_name} {data.id}
                    </Link>
                  </td>
                  <td>{data.phone_number}</td>
                  <td>{data.email}</td>
                  <td>{data.address_line_1}</td>
                  <td>{data.contact_person_full_name}</td>
                  <td>{data.contact_person_phone_number}</td>
                  <td>{data.contact_person_email}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to={`/admin/clients/${data.id}/edit`}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </Link>
                      <div onClick={() => handleShow(data.id)} className="ml-10 cursor-pointer">
                       <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </div>
                      <div className="ml-10 cursor-pointer">
                        <Link to={`/admin/clients/location`}>
                          track
                        </Link>
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
    loading: state.client.loading,
    clientList: state.client.clientList
  };
};

export default connect(mapStateToProps, {clientActions })(ClientList);
