import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendarAlt,
  faInfoCircle,
  faSignInAlt,
  faUserPlus,
  faShoppingCart,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">MagicShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Termékek
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/calendar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Naptár
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                Rólunk
              </NavLink>
            </Nav.Item>

            {!user && (
              <>
                <Nav.Item>
                  <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    Belépés
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Regisztráció
                  </NavLink>
                </Nav.Item>
              </>
            )}

            {user && (
              <>
                <Nav.Item>
                  <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Kosár
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <span onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Kilépés
                  </span>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
