import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { siteActions } from "../../../actions";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

function SiteList(props) {
  const dispatch = useDispatch();
  const guestes = useSelector((state) =>  state.site.guestes);
  const { client_id, site_id } = useParams();
  const [drpStartDate, setdrpStartDate] = useState(moment().subtract(1,'month').format("MM-DD-YYYY"));
  const [drpEndDate, setdrpEndDate] = useState(moment().format("MM-DD-YYYY"));
  const [guestesDetails, setGuestsDetails] = useState(guestes && guestes);

  useEffect(() => {
    dispatch(siteActions.historyGuests(site_id))
  }, []);

  useEffect(() => {
    setGuestsDetails(guestes)
  }, [guestes]);

  const handleApply = (event, picker) => {
    const StartDate = moment(picker.startDate).format("DD-MM-YYYY")
    const EndDate = moment(picker.endDate).format("DD-MM-YYYY")
    setdrpStartDate(StartDate)
    setdrpEndDate(EndDate)
    let filterArray = guestes && guestes.filter(el => moment(el.checkin_at).format("DD-MM-YYYY") >= StartDate && moment(el.checkin_at).format("DD-MM-YYYY") <= EndDate);
    setGuestsDetails(filterArray)
  }
  
  const filterList = (event) => {
    let value = event.target.value;
    let filterArray = guestes && guestes.filter(el => moment(el.checkin_at).format("DD-MM-YYYY") >= drpStartDate && moment(el.checkin_at).format("DD-MM-YYYY") <= drpEndDate);
    setGuestsDetails(filterArray)
    if (value !== "") {
      const newData =
      filterArray &&
      filterArray.filter(function (item) {
          const itemData = item.first_name
            ? item.first_name.toUpperCase()
            : "".toUpperCase();
          const textData = value.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setGuestsDetails(newData);
    }
  }

  const onShow = () => {
    let filterArray = guestes && guestes.filter(el => moment(el.checkin_at).format("DD-MM-YYYY") >= drpStartDate && moment(el.checkin_at).format("DD-MM-YYYY") <= drpEndDate);
    setGuestsDetails(filterArray)
  }
  return (
    <div className="container">
      <div className="page_header d-flex align-items-center justify-content-between py-2">
        <h5>Guests History</h5>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <DateRangePicker 
            onApply={handleApply}
            onShow={onShow}
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
            placeholder="Search visitor name"
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
            <th width="15%">First Name</th>
            <th width="20%">Email</th>
            <th>Phone Number</th>
            <th>Contact Person</th>
            <th>Department Name</th>
            <th>Company</th>
            <th>Address</th>
            <th>Check In</th>
            <th>Sign Out</th>
          </tr>
        </thead>
        <tbody>
          {guestesDetails && guestesDetails.length > 0 ? (
            guestesDetails.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.first_name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone_number}</td>
                  <td>{data.contact_person}</td>
                  <td>{data.department_name}</td>
                  <td>{data.company}</td>
                  <td>{data.full_address}</td>
                  <td>
                    {moment(data.checkin_at).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td>
                    {data.checkout_at
                      ? moment(data.checkout_at).format("DD-MM-YYYY hh:mm A")
                      : "-"}
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.site.loading,
    guestes: state.site.guestes,
  };
};

export default connect(mapStateToProps, { siteActions })(SiteList);
