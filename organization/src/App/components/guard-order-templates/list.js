import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderTemplateActions} from '../../../actions';
import { Button, Table, Modal, CloseButton } from 'react-bootstrap';
import { Popup } from '../../../utils-components';
import OrderTemplateForm from "../guard-order-templates/form";

function OrderTemplate(props) {
  const orderTemplates = useSelector(state => state.order_template.orderTemplates);
  const editOrderTemplate = useSelector(state => state.order_template.editOrderTemplate);
  const { clientId } = props
	const dispatch = useDispatch();
  const [activemodal, setActiveModal] = useState(false);
  const [status, setStatus] = useState()
  const [orderId, setOrderId] = useState()
  const handleModalClose = () => setActiveModal(false);

  const handleModalShow = (status) => {
    setActiveModal(true)
    setStatus(status)
  }

  useEffect(() => {
    dispatch(orderTemplateActions.getOrderTemplate(clientId))
  }, []);

  const showResult = (values) => {
    if(status === "newForm"){
      dispatch(orderTemplateActions.newOrderTemplate(clientId, values, handleModalClose));
    }else {
      dispatch(orderTemplateActions.updateOrderTemplate(clientId, orderId, values, handleModalClose));
    }
  }

  const handleEdit = (id, status) => {
    dispatch(orderTemplateActions.editOrderTemplate(clientId, id))
    setActiveModal(true)
    setStatus(status)
    setOrderId(id)
  }

  /* Popup Modal */
  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => {
    setPopUp({show: false, id: null});
  }

  const handleDestroy = (id) => setPopUp({show: true, id});

  const handleDelete = () => {
    dispatch(orderTemplateActions.destroyOrderTemplate(clientId, popup.id));
    handleClose();
  }

  return (
    <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-2">
        <h5> Order Templates </h5>
        <Button variant="primary" onClick={() => handleModalShow('newForm')}>Add Order Template</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th width="3%" className="text-center">S.No</th>
            <th>Order Title </th>
            <th width="5%">Actions</th>
          </tr>
        </thead>
        <tbody>
        {orderTemplates && orderTemplates.length > 0 ? 
          orderTemplates.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.order_title}</td>
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
          <Modal.Title id="example-custom-modal-styling-title"> Add Order Template </Modal.Title>
          <CloseButton variant="white" onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body>
          <OrderTemplateForm 
            onSubmit={showResult} 
            initialValues={ status === "editForm" ? editOrderTemplate : ""}
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

export default OrderTemplate