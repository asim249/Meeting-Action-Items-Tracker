
import React, {useState, useEffect} from 'react';
import API from '../utils/API'

const Status = () => {
  const [status, setStatus] = useState([])

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API}/api/status`)
        const data = await res.json()
        setStatus(data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchStatus()
  }, [])
  return (
    <div className="max-w-md mx-auto" style={{maxWidth: '600px'}}>
      <div className="text-center mb-5">
        <h2 className="fw-bold">System Status</h2>
        <p className="text-muted">Live monitoring of application infrastructure</p>
      </div>

      <div className="card p-4">
        <div className="alert alert-success d-flex align-items-center mb-4 border-0">
          <i className="bi bi-check-circle-fill fs-4 me-3"></i>
          <div>
            <h6 className="mb-0 fw-bold">All Systems Operational</h6>
            <small>Backend and services are performing within normal parameters.</small>
          </div>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-server me-3 text-primary"></i>
              <span>Core Application Server</span>
            </div>
            {status.backend ? (
              <span className="badge bg-success">Running</span>
            ) : (
              <span className="badge bg-danger">Down</span>
            )}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-database me-3 text-primary"></i>
              <span>Primary Database</span>
            </div>
            {status.database ? (
              <span className="badge bg-success">Connected</span>
            ) : (
              <span className="badge bg-danger">Disconnected</span>
            )}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-cpu me-3 text-primary"></i>
              <span>LLM Processing API</span>
            </div>
            {status.llm ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-danger">Inactive</span>
            )}
          </li>
          {/* <li className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-shield-check me-3 text-primary"></i>
              <span>Auth Service</span>
            </div>
            <span className="badge bg-success">Online</span>
          </li> */}
        </ul>

        <div className="mt-4 pt-3 border-top text-center">
          <small className="text-muted">
            Last check: {new Date().toLocaleTimeString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Status;
