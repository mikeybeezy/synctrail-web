import React from 'react';
import { NavLink } from "react-router-dom";

function SideNavebar(props) {
 
  const isUserLoggedIn = localStorage.getItem('userToken') ? true : false;

  const openOffcanvas = () => {
    document.body.classList.toggle('active_sidebar');
  }
  if(!isUserLoggedIn)
    return null
  
  return (
    <nav className="sidebar">
      <div className="app-logo">
        <a href="/"> SyncTrail</a>
        <div className="sidebar_close_icon d-lg-none" onClick={openOffcanvas}>
          <i className="fa fa-times"></i>
        </div>
      </div>
      <ul className="admin-menu">
        <li onClick={openOffcanvas}><NavLink exact to="/" activeClassName="selected_menu">Dashboard</NavLink></li>
        <li onClick={openOffcanvas}><NavLink exact to="/organizations/list" activeClassName="selected_menu">Organization</NavLink></li>
      </ul>
    </nav>
  );
}

export default SideNavebar;
