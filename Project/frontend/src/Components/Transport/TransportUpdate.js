import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TransportUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [timeOfDispatch, setTimeOfDispatch] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [status, setStatus] = useState('');
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

  useEffect(() => {
    axios
      .get(`http://localhost:8070/transport/${id}`)
      .then((res) => {
        setType(res.data.type);
        setDestinationAddress(res.data.destinationAddress);
        setDate(res.data.date);
        setDistance(res.data.distance);
        setTimeOfDispatch(res.data.timeOfDispatch);
        setTransportCost(res.data.transportCost);
        setStatus(res.data.status);
        setDriver(res.data.driver);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  return (
    <div className='container'>
      <h1>Transport Update Form</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const newTransport = {
            type,
            destinationAddress,
            date,
            distance,
            timeOfDispatch,
            transportCost,
            status,
            driver,
          };

          await axios
            .put('http://localhost:8070/transport/update/' + id, newTransport)
            .then((res) => {
              alert('Transport Details Updated');
              navigate('/transport');
            })
            .catch((err) => {
              console.log(err);
              alert('Error in Updating Transport Details');
            });
        }}
      >
        <div className='mb-3'>
          <label className='form-label'>Type</label>
          <select
            id='type'
            name='type'
            className='form-control'
            value={type}
            required
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
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
            value={destinationAddress}
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
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Distance</label>
          <input
            type='text'
            className='form-control'
            id='distance'
            value={distance}
            min='0'
            onChange={(e) => {
              setDistance(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Time Of Dispatch</label>
          <input
            type='time'
            className='form-control'
            id='time'
            value={timeOfDispatch}
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
            value={driver}
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
          <label className='form-label'>Transport Cost</label>
          <input
            type='number'
            className='form-control'
            id='cost'
            value={distance * 1.5 + 50}
            onChange={(e) => {
              setTransportCost(e.target.value);
            }}
          />
        </div> */}
        <div className='mb-3'>
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
        </div>
        <button
          type='submit'
          className='btn btn-light'
          style={{ backgroundColor: '#FF5A5F' }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default TransportUpdate;
