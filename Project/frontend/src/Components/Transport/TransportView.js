import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TransportView = () => {
  const [transport, setTransport] = useState([]); // useState is a hook that is used to create a state variable and a function to update it
  const getTransport = async () => {
    // getTransport is a function that is used to get the transport details from the database
    axios
      .get('http://localhost:8070/transport/')
      .then((res) => {
        setTransport(res.data); // setTransport is a function that is used to set the transport details to the state variable
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    // useEffect is used to call the getTransport function
    getTransport();
  }, []); // [] is used to call the getTransport function only once

  const deleteTransport = async (id) => {
    await axios
      .delete(`http://localhost:8070/transport/delete/${id}`)
      .then((res) => {
        alert('Transport Details Deleted');
        getTransport();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className='container'>
        <h1>Transport View</h1>
        <table className='table table-striped table-bordered table-hover table-responsive table-sm'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Type</th>
              <th scope='col'>Destination Address</th>
              <th scope='col'>Date</th>
              <th scope='col'>Distance</th>
              <th scope='col'>Time Of Dispatch</th>
              <th scope='col'>Transport Cost</th>
              <th scope='col'>Status</th>
              <th scope='col'>Manage</th>
            </tr>
          </thead>
          <tbody>
            {transport.map((transport) => (
              // map is used to iterate through the transport details
              <tr key={transport._id}>
                <td>{transport._id}</td>
                <td>{transport.type}</td>
                <td>{transport.destinationAddress}</td>
                <td>{transport.date.substring(0, 10)}</td>
                <td>{transport.distance} km</td>
                <td>{transport.timeOfDispatch}</td>
                <td>Rs {(transport.distance * 1.5 + 50).toFixed(2)} </td>
                <td>{transport.status}</td>
                <td>
                  <Link to={'/transport/transportUpdate/' + transport._id}>
                    <button type='button' className='btn btn-primary me-1'>
                      Edit
                    </button>
                  </Link>
                  <button
                    type='button'
                    className='btn btn-primary me-1'
                    onClick={() => {
                      deleteTransport(transport._id);
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

export default TransportView;
