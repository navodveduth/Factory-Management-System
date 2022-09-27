import React from 'react'
import '../../styles/Chanukya/MachineryNavbar.css'
import {Link} from 'react-router-dom';

function DahboardNavbar() {
  return (
    <div className='machNavbarContainer'>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">HOME</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" to={'/machinery'}>Machinery</Link>
                    {/* <a className="nav-link " aria-current="page" href="machineryView">view</a> */}
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/maintainence'}>Maintainence</Link>
                    {/* <a className="nav-link" href="machinery">create</a> */}
                    </li>
                </ul>
                
                </div>
            </div>
        </nav>
       </div>
  )
}

export default DahboardNavbar