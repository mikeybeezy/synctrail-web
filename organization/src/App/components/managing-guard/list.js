import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Button , Table } from 'react-bootstrap';
import UnknownnImage from '../../../images/noimage.png'
import { guardManagementActions } from '../../../actions';
import { Popup } from '../../../utils-components';

function GuardList(props) {
  const { guardlist } = props
	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(guardManagementActions.getGuardData());
  }, []);

  /* Popup Modal */
  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => {
    setPopUp({show: false, id: null});
  }

  const handleShow = (id) => setPopUp({show: true, id});

  const handleDelete = () => {
    dispatch(guardManagementActions.destroyGuard(popup.id));
    handleClose();
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-3">
        <h4>Guards</h4>
        <Link to="/admin/guard/new">
          <Button variant="primary">Add Guard</Button>
        </Link>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th  className="text-center">S.No</th>
            <th>photo</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Data of Birth</th>
            <th>State of orgin</th>
            <th>National Id</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Email</th>
            <th style={{width: '5%'}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guardlist && guardlist.length > 0 ? 
            guardlist.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img src={data.photo.url ? data.photo.url : UnknownnImage} style={{ maxWidth: 80, maxHeight: 80, borderRadius: 4, height: 55 }} alt="img"/>
                  </td>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>{data.birthdate}</td>
                  <td>{data.origin_state}</td>
                  <td>{data.national_id_number}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.full_address}</td>
                  <td>{data.email}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to={`/admin/guard/${data.id}/edit`}>
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
    loading: state.guard.loading,
    guardlist: state.guard.guardlist
  };
};

export default connect(mapStateToProps,{ guardManagementActions })(GuardList);
