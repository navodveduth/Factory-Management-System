import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Transport = () => {
  const navigate = useNavigate(); // This is a hook that allows us to navigate to a different route

  const [type, setType] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [timeOfDispatch, setTimeOfDispatch] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [driver, setDriver] = useState('');
  const [drivers, setDrivers] = useState([]);

  const getDrivers = async () => {
    axios
      .get('http://localhost:8070/driver/')
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <div className='container'>
      <h1>Transport Form</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault(); // prevent the page from reloading

          const newTransport = {
            type,
            destinationAddress,
            date,
            distance,
            timeOfDispatch,
            transportCost,
            driver,
          };

          await axios
            .post('http://localhost:8070/transport/create', newTransport)
            .then((res) => {
              alert('Transport Details Added');
              navigate('/transport');
            })
            .catch((err) => {
              console.log(err);
              alert('Error in Adding Transport Details');
            });
        }}
      >
        <div className='mb-3'>
          <label className='form-label'>Type</label>
          <select
            id='type'
            name='type'
            className='form-control'
            required
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value=''>Select...</option>
            <option value='Staff'>Staff</option>
            <option value='Employee'>Employee</option>
            <option value='Goods'>Goods</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Destination Address</label>
          <input
            type='text'
            className='form-control'
            id='address'
            required
            onChange={(e) => {
              setDestinationAddress(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Date</label>
          <input
            type='date'
            className='form-control'
            id='date'
            required
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Distance (Km)</label>
          <input
            type='text'
            className='form-control'
            id='distance'
            required
            min='0'
            onChange={(e) => {
              setDistance(e.target.value);
              setTransportCost((e.target.value * 100 + 250).toFixed(2));
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Time Of Dispatch</label>
          <input
            type='time'
            className='form-control'
            id='time'
            required
            onChange={(e) => {
              setTimeOfDispatch(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Driver</label>
          <select
            id='driver'
            name='driver'
            className='form-control'
            required
            onChange={(e) => {
              setDriver(e.target.value);
            }}
          >
            {drivers.map((item, index) => (
              <option value={item.firstName} key={index}>
                {item.firstName}
              </option>
            ))}
          </select>
        </div>
        {/* <div className='mb-3'>
          <label className='form-label'>Status</label>
          <select
            id='status'
            name='status'
            className='form-control'
            required
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value='Pending'>Pending</option>
            <option value='Completed'>Completed</option>
          </select>
        </div> */}
        <button
          type='submit'
          className='btn btn-light'
          style={{ backgroundColor: '#FF5A5F' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Transport;
