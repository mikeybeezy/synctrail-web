import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { userActions, initialActions } from '../../../actions';
import UnknownnProfile from '../../../images/unkown-profile.jpg'

function AppHeader(props) {
  const dispatch = useDispatch();
  const isUserLoggedIn = localStorage.getItem('userToken') ? true : false;
  const isUserRole = localStorage.getItem('userRole')
  const organization_id = localStorage.getItem('organiToken')
  const currentUser = useSelector(state => state.initial.currentUser);
  const organizations = useSelector(state => state.initial.organizations);
     
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
    localStorage.removeItem('organiToken');
  }

  const organizationDropdown = (e) => {
    localStorage.setItem('organiToken', e.target.value);
    window.location.reload();
  }

  return (
    <div>
       { isUserLoggedIn ?
          <Navbar bg="dark" variant="dark">
            <Container>
              <div className="d-flex align-items-center">
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
              <Nav className="ml-auto align-items-center">
                <div>
                  <select className="organization-select"  onChange={organizationDropdown} value={organization_id}>
                    { organizations && organizations.length > 0 ?
                        organizations.map((data, index) => (
                          <option value={data.id} key={data.id}>{data.display_name}</option>
                        ))
                      : null
                    }
                  </select>
                </div>
                <NavDropdown 
                  title={
                    <div className="user_name">
                      <img className="profile-image" src={UnknownnProfile} alt="user pic"/>
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

export default AppHeader;



