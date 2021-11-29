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
        <li onClick={openOffcanvas}><NavLink exact to="/" activeClassName="selected">Dashboard</NavLink></li>
        <li onClick={openOffcanvas}><NavLink exact to="/admin/clients/list"  activeClassName="selected">Clients</NavLink></li>
        <li onClick={openOffcanvas}><NavLink exact to="/admin/guard/list"  activeClassName="selected">Guard Management</NavLink></li>
        <li onClick={openOffcanvas}><NavLink exact to="/admin/chats"  activeClassName="selected">Chat</NavLink></li>
      </ul>
    </nav>
  );
}

export default SideNavebar;
