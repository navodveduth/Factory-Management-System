import React, { useState } from 'react'
import '../styles/financeNavbar.css'
import {Link} from 'react-router-dom';

function FinanceNavBar() {
    return (
    <div className='FinNavBar'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>HOME</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" to={'/finance'}>View Entries</Link>
                    {/* <a className="nav-link " aria-current="page" href="machineryView">view</a> */}
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/finance/add'}>Master Entry</Link>
                    {/* <a className="nav-link" href="machinery">create</a> */}
                    </li>
                </ul>
                <form className="d-flex">
{/*                     <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}/> */}
                   {/*  <button className="btn btn-outline-success" type="submit">Search</button> */}
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default FinanceNavBar