import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Table, Modal, Button } from "react-bootstrap";
import { siteActions } from "../../../actions";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

function SiteList(props) {
  const dispatch = useDispatch();
  const { client_id, site_id } = useParams();
  const { reports } = props;
  const [show, setShow] = useState(false);
  const [incidentImages, setIncidentImages] = useState();
  const [drpStartDate, setdrpStartDate] = useState(moment().subtract(1,'month').format("MM-DD-YYYY"));
  const [drpEndDate, setdrpEndDate] = useState(moment().format("MM-DD-YYYY"));
  const [reportsDetails, setReportsDetails] = useState(reports && reports);

  useEffect(() => {
    dispatch(siteActions.historyReports(site_id));
  }, []);

  useEffect(() => {
    setReportsDetails(reports)
  }, [reports]);

  const handleClose = () => setShow(false);

  const handleShow = (incidentImages) => {
    setShow(true);
    setIncidentImages(incidentImages);
  }
  const handleApply = (event, picker) => {
    const StartDate = moment(picker.startDate).format("DD-MM-YYYY")
    const EndDate = moment(picker.endDate).format("DD-MM-YYYY")
    setdrpStartDate(StartDate)
    setdrpEndDate(EndDate)
    let filterArray = reports && reports.filter(el => moment(el.created_at).format("DD-MM-YYYY") >= StartDate && moment(el.created_at).format("DD-MM-YYYY") <= EndDate);
    setReportsDetails(filterArray)
  }
  
  const filterList = (event) => {
    let value = event.target.value;
    let filterArray = reports && reports.filter(el => moment(el.created_at).format("DD-MM-YYYY") >= drpStartDate && moment(el.created_at).format("DD-MM-YYYY") <= drpEndDate);
    setReportsDetails(filterArray)
    if (value !== "") {
      const newData =
      filterArray &&
      filterArray.filter(function (item) {
          const full_name = item.guard_profile.first_name + item.guard_profile.last_name
          const itemData = full_name
            ? full_name.toUpperCase()
            : "".toUpperCase();
          const textData = value.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setReportsDetails(newData);
    }
  }

  return (
    <div className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-2">
        <h5>Incident Reports History</h5>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <DateRangePicker 
            onApply={handleApply}
            initialSettings={{ startDate: drpStartDate, endDate: drpEndDate }}
          >
            <input 
              type="text" 
              className="form-control" 
              id="fileinput" 
            />
          </DateRangePicker>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search guard name"
            className="form-control"
            onChange={filterList}
          />
        </div>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th className="text-center" style={{ width: "3%" }}>
              S.No
            </th>
            <th width="10%">Incident Type</th>
            <th width="20%">Summary</th>
            <th width="30%">Description</th>
            <th width="10%">Guard name</th>
            <th width="15%">Created at</th>
            <th width="15%"></th>
          </tr>
        </thead>
        <tbody>
          {reportsDetails && reportsDetails.length > 0 ? (
            reportsDetails.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.incident_type} {data.name}</td>
                  <td>{data.summary}</td>
                  <td>{data.description}</td>
                  <td>{data.guard_profile.first_name} {data.guard_profile.last_name}</td>
                  <td>
                    {moment(data.created_at).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td>
                    <div onClick={() => handleShow(data.incident_images)} style={{color: 'blue', textAlign: 'center', cursor: 'pointer'}}>
                      {" "}
                      Attachments ({data.incident_images ? data.incident_images.length : 0}){" "}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <td colSpan="20" className="text-center">
              <div className="py-3">No data yet</div>
            </td>
          )}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: 18 }}>
            Report Incident Images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 210px)",
            overflowY: "auto",
          }}
        >
          <div className="row">
            {incidentImages &&
              incidentImages.map((data, i) => {
                let filename = data.image.url.substring(data.image.url.lastIndexOf('/')+1);
                return (
                  <div key={data.id} className="col-md-12">
                    <div className="d-flex justify-content-between pb-1 mb-2" style={{borderBottom: '1px solid #ddd'}}>
                      <div style={{fontSize: '14px'}}> {filename}</div>
                      <a
                        href={data.image.url}
                        target="_blank"
                        download={filename}
                        style={{fontSize: 13, fontWeight: 400, color: 'blue'}}
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.site.loading,
    reports: state.site.reports,
  };
};

export default connect(mapStateToProps, { siteActions })(SiteList);
