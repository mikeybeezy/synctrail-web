import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Button , Table,  Modal, CloseButton } from 'react-bootstrap';
import { guardOrderActions } from '../../../actions';
import { Popup } from '../../../utils-components';
import FormModal from "../guard-orders/modal";

function GuardOrderList(props) {
	const dispatch = useDispatch();
  const { guardOrders } = props
  const { schedule_id } = useParams();
  const [show, setShow] = useState(false);
  const [singleOrder, setSingleOrder] = useState()

  useEffect(() => {
    dispatch(guardOrderActions.getOrders(schedule_id));
  }, []);

  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => { 
    setPopUp({show: false, id: null})
    setShow(false)
  }

  const handleShow = (status, id) => {
    if(status === "edit") {
      const findOrder = guardOrders.find(function(item, i){
        return item.id === id;
      })
      setSingleOrder(findOrder)
      setShow(true)
    }else {
      setPopUp({show: true, id});
    }
  }

  const handleDelete = () => {
    dispatch(guardOrderActions.destroyGuardOrder(schedule_id, popup.id));
    handleClose();
  }

  const showResult = (values) => {
   const id = values.id
   dispatch(guardOrderActions.updateGuardOrder(schedule_id, id, values, handleClose));
  }

  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-2">
        <h5>Guard Management  Set Orders</h5>
        <Link to={`/admin/guard/schedule/${schedule_id}/orders/new`}>
          <Button variant="primary" size="sm">Add Order</Button>
        </Link>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th className="text-center" style={{width: '5%'}}>S.No</th>
            <th>Order title</th>
            <th style={{width: '10%'}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guardOrders && guardOrders.length > 0 ? 
            guardOrders.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.order_title}</td>             
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <div onClick={() => handleShow("edit", data.id)} className="cursor-pointer">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </div>
                      <div onClick={() => handleShow(data.id)} className="ml-20 cursor-pointer">
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
       <Modal show={show} onHide={handleClose} backdrop="static"
          keyboard={false}
          className="custom-modal"
          centered>
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title"> Update Order</Modal.Title>
            <CloseButton variant="white" onClick={handleClose}/>
          </Modal.Header>
          <Modal.Body>
            <FormModal 
              onSubmit={showResult} 
              initialValues={singleOrder && singleOrder}
              status="edit"
              handleClose={handleClose}
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

const mapStateToProps = (state) => {
  return { guardOrders: state.guard_order.guardOrders }
};

export default connect(mapStateToProps, { guardOrderActions })(GuardOrderList);
