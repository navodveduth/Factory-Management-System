import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DriverView = () => {
  const [driver, setDriver] = useState([]); // useState is a hook that is used to create a state variable and a function to update it
  const getDriver = async () => {
    axios
      .get('http://localhost:8070/driver/')
      .then((res) => {
        setDriver(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDriver();
  }, []); // [] is used to call the function only once

  const deleteDriver = async (id) => {
    await axios
      .delete(`http://localhost:8070/driver/delete/${id}`)
      .then((res) => {
        alert('Driver Details Deleted');
        getDriver();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className='container'>
        <h1>Driver View</h1>
        <table className='table table-striped table-bordered table-hover table-responsive table-sm'>
          <thead>
            <tr>
              {/* <th scope='col'>ID</th> */}
              <th scope='col'>NIC</th>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Driving License Number</th>
              <th scope='col'>Contact Number</th>
              <th scope='col'>Vehicle Number</th>
              <th scope='col'>Vehicle Model</th>
              <th scope='col'>Manage</th>
            </tr>
          </thead>
          <tbody>
            {driver.map((driver) => (
              <tr key={driver._id}>
                {/* <td>{driver._id}</td> */}
                <td>{driver.nic}</td>
                <td>{driver.firstName}</td>
                <td>{driver.lastName}</td>
                <td>{driver.drivingLicenseNo}</td>
                <td>{driver.contactNo}</td>
                <td>{driver.vehicleNo}</td>
                <td>{driver.vehicleModel}</td>
                <td>
                  <Link to={'/driver/driverUpdate/' + driver._id}>
                    <button type='button' className='btn btn-primary me-1'>
                      Edit
                    </button>
                  </Link>
                  <button
                    type='button'
                    className='btn btn-primary me-1'
                    onClick={() => {
                      deleteDriver(driver._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DriverView;
