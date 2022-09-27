import React from 'react'
import '../styles/Chanukya/MachineryNavbar.css'
import {Link} from 'react-router-dom';

function MaintainenceNavbar() {
  return (
    <div className='machNavbarContainer'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link className="navbar-brand" to={'/dashboard'}>Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" to={'/maintainence'}>Maintenance Management</Link>
                    {/* <a className="nav-link " aria-current="page" href="maintainenceView">view</a> */}
                    </li>
            
                </ul>
            
                </div>
            </div>
        </nav>
    </div>
  )
}

export default MaintainenceNavbar