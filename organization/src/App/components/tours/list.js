import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Button , Table} from 'react-bootstrap';
import { tourActions } from '../../../actions';
import { Popup } from '../../../utils-components';

function ClientList(props) {
	const dispatch = useDispatch();
  const { tourData } = props
   const { client_id } = useParams();

  useEffect(() => {
    dispatch(tourActions.getTourData(client_id));
  }, []);

  /* Popup Modal */
  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => {
    setPopUp({show: false, id: null});
  }

  const handleShow = (id) => setPopUp({show: true, id});

  const handleDelete = () => {
    // dispatch(clientActions.destroyClient(popup.id));
    handleClose();
  }

  if (props.loading) {
    return <div className="page_loading">Loading..</div>
  }

  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-3">
        <h3>Tours</h3>
        <Link to={`/admin/clients/${client_id}/tours/new`}>
          <Button variant="primary" size="sm">Add Tour</Button>
        </Link>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th className="text-center" style={{width: '5%'}}>S.No</th>
            <th>Tour Name</th>
            <th style={{width: '5%'}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tourData && tourData.length > 0 ? 
            tourData.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.name}{data.id}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to={`/admin/clients/${client_id}/tours/${data.id}/edit`}>
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
    loading: state.tour.loading,
    tourData: state.tour.tourData
  };
};

export default connect(mapStateToProps, {tourActions })(ClientList);
