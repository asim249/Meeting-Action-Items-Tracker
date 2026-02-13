
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column min-vh-screen">
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold text-primary" to="/">
            <i className="bi bi-journal-check me-2 fs-3"></i>
            MeetTrack
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link px-3 ${location.pathname === '/' ? 'active text-primary fw-semibold' : ''}`} to="/">
                  Tracker
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link px-3 ${location.pathname === '/status' ? 'active text-primary fw-semibold' : ''}`} to="/status">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4 flex-grow-1">
        {children}
      </main>

      <footer className="bg-white border-top py-4 mt-auto">
        <div className="container text-center text-muted small">
          &copy; 2024 Meeting Action Items Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
