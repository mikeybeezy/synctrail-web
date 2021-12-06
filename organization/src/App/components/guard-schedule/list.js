import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Button , Table} from 'react-bootstrap';
import { scheduleActions } from '../../../actions';
import { Popup } from '../../../utils-components';

function ScheduleList(props) {
  const dispatch = useDispatch();
  const { scheduleList } = props
  
  useEffect(() => {
    dispatch(scheduleActions.getScheduleData());
  }, []);

  console.log(scheduleList)
  console.log(scheduleList)
  console.log(scheduleList)

  /* Popup Modal */
  const [popup, setPopUp] = useState({show: false, id: null});

  const handleClose = () => {
    setPopUp({show: false, id: null});
  }

  const handleShow = (id) => setPopUp({show: true, id});

  const handleDelete = () => {
    dispatch(scheduleActions.destroySchedule(popup.id));
    handleClose();
  }

  return (
   <div  className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-3">
        <h5>Guard Management </h5>
        <Link to={`/admin/guard/schedule/new`}>
          <Button variant="primary" size="sm">Add Schedule</Button>
        </Link>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th className="text-center" style={{width: '3%'}}>S.No</th>
            <th>Guard Name</th>
            <th>Location</th>
            <th>Tour</th>
            <th>Ongoing</th>
            <th>From Date</th>
            <th>End Date</th>
            <th style={{width: '5%'}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>

          {scheduleList && scheduleList.length > 0 ? 
            scheduleList.map((data, index) => {
              return(
                <tr>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.guard_profile && data.guard_profile.first_name}</td>
                  <td>{data.location && data.location.name}</td>
                  <td>{data.tour && data.tour.name}</td>
                  <td>{data.ongoing}</td>
                  <td>{data.from_date}</td>
                  <td>{data.to_date}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to={`/admin/guard/schedule/${data.id}/edit`}>
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
    scheduleList: state.schedule.scheduleList
  };
};

export default connect(mapStateToProps,{ scheduleActions })(ScheduleList);
