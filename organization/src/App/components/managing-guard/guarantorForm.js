import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { Button, Table, Modal, CloseButton } from 'react-bootstrap';
import GuarantorModal from "../managing-guard/guarantorModal";

function GuarantorForm(props) {
  const editGuarntor = useSelector(state => state.guard.editGuarntor);
  const { formStatus } = props;
  const [guarntorlist, setGuarntorList] = useState( editGuarntor ? editGuarntor : []);
  const [singledata, setSingleData] = useState();
  const [indexvalue, setIndexValue] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState();
  
  useEffect(() => {
    if(formStatus === "newForm") {
      setGuarntorList([])
    }  
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (status_form, index) => {
    if(status_form === "newForm") {
      setSingleData("")
      setShow(true);
      setStatus("new")
    }else {
      const findArray = guarntorlist.find(function(item, i){
        return i === index;
      })
      setSingleData(findArray)
      setShow(true);
      setIndexValue(index)
      setStatus("edit")
    }
  }
  const _deletelist = (index, id) => {
    if(formStatus === "editForm"){
      if(id) {
        let array = guarntorlist.map((el, i) => (
          i === index ? {...el, _destroy: true}: el
        ))
        setGuarntorList(array);
        const className = index + 'findClass_row'
        const currentClass = document.getElementsByClassName(className)
        for (let i = 0; i < currentClass.length; i++) {
          currentClass[i].classList.toggle('hidden')
        }
      }else {
        guarntorlist.splice(index, 1);
        setGuarntorList(guarntorlist.filter(i => i !== index))
      }
    }else {
      console.log("delete " + index);
      guarntorlist.splice(index, 1);
      setGuarntorList(guarntorlist.filter(i => i !== index))
    }
  }

  const showResult = (values) => {
    if(status === "edit") {
      let updateArray = guarntorlist.map((el, i) => (
        i === indexvalue ? {...el, first_name: values.first_name, last_name: values.last_name, relationship_to_guard: values.relationship_to_guard, national_id_number: values.national_id_number, phone_number: values.phone_number, full_address: values.full_address, email: values.email, birthdate: values.birthdate}: el
      ))
      setGuarntorList(updateArray);
      setShow(false);
    }else {
      setGuarntorList(guarntorlist => [...guarntorlist, values])
      setShow(false);
    }
  }
  props.onSelectGuarntor(guarntorlist); 

  return (
    <div className="mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5>Add Guarntor</h5>
        <Button onClick={() => handleShow("newForm")} variant="default">Add</Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
        centered>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title"> Add Guarntor </Modal.Title>
          <CloseButton variant="white" onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body>
          <GuarantorModal 
            onSubmit={showResult} 
            initialValues={singledata && singledata}
            status={status}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
      <div className="responsive">
        <Table bordered size="sm responsive">
          <thead>
            <tr>
              <th>No</th>
              <th width="10%">First ame</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Birthday</th>
              <th>Relationship to guard</th>
              <th>National id number</th>
              <th>Full address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guarntorlist && guarntorlist.length > 0 ? 
              guarntorlist.map((data, index) => {
                return (
                  <tr key={index} className={index + "findClass_row"}>
                    <td>{index + 1}</td>
                    <td>{data.first_name}{data.id}</td>
                    <td>{data.last_name}</td>
                    <td>{data.email}</td>
                    <td>{data.phone_number}</td>
                    <td>{data.birthdate}</td>
                    <td>{data.relationship_to_guard}</td>
                    <td>{data.national_id_number}</td>
                    <td>{data.full_address}</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        <div onClick={() => handleShow("edit", index)} className="cursor-pointer"> 
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
              <td colSpan="20" className="text-center">
                No data yet
              </td>
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}


export default GuarantorForm;
