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
            <th>Guard</th>
            <th>Client</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th width="20%">Days</th>
            <th>Tour</th>
            <th style={{width: '10%'}} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scheduleList && scheduleList.length > 0 ? 
            scheduleList.map((data, index) => {
              return(
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.guard_profile && data.guard_profile.first_name}</td>
                  <td>{data.client && data.client.business_name}</td>
                  <td>{data.location && data.location.name}</td>
                  <td>{data.from_date}</td>
                  <td>{data.to_date ? data.to_date : <span className="on-going">OnGoing</span>}</td>
                  <td>
                    { data.days_shift.map((data, index) => {
                        if(data === 1){
                          return (<span className="days_shift">M</span>)
                        }else if (data === 2) {
                          return (<span className="days_shift">T</span>)
                        }else if (data === 3) {
                          return (<span className="days_shift">W</span>)
                        }else if (data === 4) {
                          return (<span className="days_shift">Th</span>)
                        }else if (data ===5 ) {
                          return (<span className="days_shift">F</span>)
                        }else if (data ===6 ) {
                          return (<span className="days_shift">S</span>)
                        }else if (data === 7 ) {
                          return (<span className="days_shift">Su</span>)
                        }
                      })
                    }
                  </td>
                  <td>{data.tour && data.tour.name}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to={`/admin/guard/schedule/${data.id}/edit`}>
                        Orders
                      </Link>
                      <Link to={`/admin/guard/schedule/${data.id}/edit`} className="px-2">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </Link>
                      <div onClick={() => handleShow(data.id)} className="cursor-pointer">
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
    scheduleList: state.schedule.scheduleList
  };
};

export default connect(mapStateToProps,{ scheduleActions })(ScheduleList);
