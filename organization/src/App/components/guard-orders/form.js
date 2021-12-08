import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { Button, Table, Modal, CloseButton } from 'react-bootstrap';
import FormModal from "../guard-orders/modal";
import { guardOrderActions } from '../../../actions';
import { useDispatch } from 'react-redux';

function OrderForm(props) {
  const dispatch = useDispatch();
  const orderTemplates = useSelector(state => state.guard_order.orderTemplates);
  const { handleSubmit, formStatus } = props;
  const [orderslist, setOrdersList] = useState([]);
  const [singledata, setSingleData] = useState();
  const [indexvalue, setIndexValue] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();
  
  useEffect(() => {
    if(formStatus === "newForm") {
      setOrdersList([])
    }  
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (status_form, index) => {
    if(status_form === "newForm") {
      setSingleData("")
      setShow(true);
      setStatus("new")
    }else {
      const findArray = orderslist.find(function(item, i){
        return i === index;
      })
      setSingleData(findArray)
      setShow(true);
      setIndexValue(index)
      setStatus("edit")
    }
  }
  const _deletelist = (index, id) => {
    console.log("delete " + index);
    orderslist.splice(index, 1);
    setOrdersList(orderslist.filter(i => i !== index))
  }

  const showResult = (values) => {
    if(status === "edit") {
      let updateArray = orderslist.map((el, i) => (
        i === indexvalue ? {...el, order_title: values.order_title}: el
      ))
      setOrdersList(updateArray);
      setShow(false);
    }else {
      setOrdersList(orderslist => [...orderslist, values])
      setShow(false);
    }
  }
  props.onSelectGuarntor(orderslist); 

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5>Assigned Order List</h5>
        <Button onClick={() => handleShow("newForm")} variant="primary">Add New Order</Button>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}
        className="custom-modal"
        centered>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title"> 
            {status === "new" ? ' Add Order' : 'Update Order'} 
          </Modal.Title>
          <CloseButton variant="white" onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body>
          <FormModal 
            onSubmit={showResult} 
            initialValues={singledata && singledata}
            status={status}
            handleClose={handleClose}
            orderTemplates={orderTemplates && orderTemplates}
          />
        </Modal.Body>
      </Modal>
      <div className="responsive">
        <Table bordered size="sm responsive">
          <tbody>
            {orderslist && orderslist.length > 0 ? 
              orderslist.map((data, index) => {
                return (
                  <tr key={index} className={index + "findClass_row"}>
                    <td className="text-center" width="3%">{index + 1}</td>
                    <td>{data.order_title}</td>
                    <td width="8%">
                      <div className="d-flex align-items-center justify-content-center">
                        <div onClick={() => handleShow("edit", index)} className="cursor-pointer pr-2"> 
                          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </div>
                        <div onClick={() => _deletelist(index, data.id)} className="ml-10 cursor-pointer">
                         <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
              : 
              <td colSpan="20" className="text-center py-2">
                No data yet
              </td>
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}


export default OrderForm;
