import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Table, Modal, Button } from "react-bootstrap";
import { siteActions } from "../../../actions";
import moment from "moment";

function SiteList(props) {
  const dispatch = useDispatch();
  const { client_id, site_id } = useParams();
  const { reports } = props;
  const [show, setShow] = useState(false);
  const [incidentImages, setIncidentImages] = useState();

  useEffect(() => {
    dispatch(siteActions.historyReports(site_id));
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (incidentImages) => {
    setShow(true);
    setIncidentImages(incidentImages);
  };
  return (
    <div className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-2">
        <h5>Incident Reports History</h5>
      </div>
      <Table bordered size="sm responsive">
        <thead>
          <tr>
            <th className="text-center" style={{ width: "3%" }}>
              S.No
            </th>
            <th width="15%">Incident Type</th>
            <th width="20%">Summary</th>
            <th width="30%">Description</th>
            <th width="20%">Created at</th>
            <th width="20%"></th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.length > 0 ? (
            reports.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.incident_type}</td>
                  <td>{data.summary}</td>
                  <td>{data.description}</td>
                  <td>
                    {moment(data.created_at).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td>
                    <div onClick={() => handleShow(data.incident_images)} style={{color: 'blue', textAlign: 'center', cursor: 'pointer'}}>
                      {" "}
                      Incident Images{" "}
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
                return (
                  <div key={data.id} className="col-md-12">
                    <img
                      src={data.image.url}
                      alt="user pic"
                      style={{ width: "100%", marginBottom: 10 }}
                    />
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
