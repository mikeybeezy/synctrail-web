import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { organizationActions} from '../../../actions';
import { Button, Table, Modal, CloseButton } from 'react-bootstrap';
import { Popup } from '../../../utils-components';
import OrganizationForm from '../organization/form'

function OrganizationList(props) {
  const organizationList = useSelector(state => state.organization.organizationList);
  const editOrganizationList = useSelector(state => state.organization.editOrganization);
	const dispatch = useDispatch();
  const [activemodal, setActiveModal] = useState(false);
  const [status, setStatus] = useState()
  const [orgid, setOrgId] = useState()
  const handleModalClose = () => setActiveModal(false);

  const handleModalShow = (status) => {
    setActiveModal(true)
    setStatus(status)
  }

  useEffect(() => {
    dispatch(organizationActions.getOrganization())
  }, []);

  const showResult = (values) => {
    if(status === "newForm"){
      dispatch(organizationActions.newOrganization(values, handleModalClose));
    }else {
      dispatch(organizationActions.updateOrganization(orgid, values, handleModalClose));
    }
  }

  const handleEdit = (id, status) => {
    dispatch(organizationActions.editOrganization(id))
    setActiveModal(true)
    setStatus(status)
    setOrgId(id)
  }

  /* Popup Modal */
  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => {
    setPopUp({show: false, id: null});
  }

  const handleDestroy = (id) => setPopUp({show: true, id});

  const handleDelete = () => {
    dispatch(organizationActions.destroyOrganization(popup.id));
    handleClose();
  }


  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
    <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between mb-3">
        <h3> Organizations </h3>
        <Button variant="primary" onClick={() => handleModalShow('newForm')}>New Organization</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th width="3%" className="text-center">S.No</th>
            <th>Display name </th>
            <th>Business name</th>
            <th>Platform notes</th>
            <th width="5%">Actions</th>
          </tr>
        </thead>
        <tbody>
        {organizationList && organizationList.length > 0 ? 
          organizationList.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.display_name}</td>
                <td>{data.business_name}</td>
                <td>{data.platform_notes}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-between">
                    <div onClick={() => handleEdit(data.id, "editForm")} className="cursor-pointer">
                      <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </div>
                    <div onClick={() => handleDestroy(data.id)} className="cursor-pointer">
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </div>
                  </div>
                </td>
              </tr>
            )
          })
          :
          <td colSpan="5" className="text-center">
            <div className="py-3">No data yet</div>
          </td>
        }
        </tbody>
      </Table>
      <Modal show={activemodal} onHide={handleModalClose} backdrop="static" keyboard={false} className="custom-modal" centered>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title"> Add Organization </Modal.Title>
          <CloseButton variant="white" onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body>
          <OrganizationForm 
            onSubmit={showResult} 
            initialValues={ status === "editForm" ? editOrganizationList : ""}
            handleModalClose={handleModalClose}
            status={status}
          />
        </Modal.Body>
      </Modal>
      {popup.show &&
        <Popup
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      }
    </div>
  );
}

export default OrganizationList