import { Modal, Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton'

function Popup({ handleClose, handleDelete }) {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Body className="custom_body">
         <div onClick={handleClose} className="close_modal"><CloseButton /></div>
        <div className="text-center">
          <div className="mb-4"> You sure you wanna delete?</div>
          <div className="d-flex align-items-center justify-content-center">
            <Button variant="secondary" size="sm" onClick={handleClose} className="px-3"> Close </Button>
            <Button variant="primary" size="sm" onClick={handleDelete} className="mx-3 px-3"> Yes</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export { Popup };
