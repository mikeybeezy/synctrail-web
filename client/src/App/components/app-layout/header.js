import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { userActions, initialActions } from '../../../actions';

function SideNavebar(props) {
  const dispatch = useDispatch();
  const isUserLoggedIn = localStorage.getItem('userToken') ? true : false;
  const isUserRole = localStorage.getItem('userRole')

  const currentUser = useSelector(state => state.initial.currentUser);
  
  useEffect(() => {
    dispatch(initialActions.initialData());
  }, []);

  const openOffcanvas = () => {
    document.body.classList.toggle('active_sidebar');
  }

  const offcanvasDesktop = () => {
    document.body.classList.toggle('desktop_active');
  }

  function logout(response) {
    dispatch(userActions.logout());
  }

  return (
    <div>
       { isUserLoggedIn ?
          <Navbar bg="dark" variant="dark">
            <Container>
              <div>
                <div className="sidebar_icon d-lg-none"  onClick={openOffcanvas}>
                 <i className="fa fa-bars"></i>
                </div>
                { isUserRole === "admin" ?
                  <div className="sidebar_icon mobile-none"  onClick={offcanvasDesktop}>
                    <i className="fa fa-bars"></i>
                  </div>
                : null
                }
                { isUserRole !== "admin" ?  <div className="mobile-none logo_text">SyncTrial</div> : null }
              </div>
              <Nav className="ml-auto">
                <NavDropdown 
                  title={
                    <div className="user_name">
                      <img className="profile-image" src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg" alt="user pic"/>
                      <span>{currentUser && currentUser.username}</span>
                      <span className="fa-icons"> </span>
                    </div>
                  }
                  id="collasible-nav-dropdown" 
                >
                <NavDropdown.Item href="#" onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        : null
      }
    </div>
  );
}

export default SideNavebar;



