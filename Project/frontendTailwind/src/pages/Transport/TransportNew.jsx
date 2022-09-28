/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

const TransportNew = () => {
  const navigate = useNavigate(); // useNavigate hook to redirect to another page after form submission is successful

  const [type, setType] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [timeOfDispatch, setTimeOfDispatch] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [description, setDescription] = useState('');
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
      <Header category="Form" title="New Transport" />
      <div className=" flex items-center justify-center ">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const newEmployee = {
              type,
              destinationAddress,
              date,
              distance,
              timeOfDispatch,
              transportCost,
              driver,
              description,
            };

            await axios
              .post('http://localhost:8070/transport/create', newEmployee)
              .then((res) => {
                alert('Transport Details Added');
                navigate('/TransportViewAll');
              })
              .catch((err) => {
                console.log(err);
                alert('Error in Adding Transport Details');
              });
          }}
        >
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select
              id="type"
              name="type"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              required
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option selected>Select...</option>
              <option value="Staff">Staff</option>
              <option value="Employee">Employee</option>
              <option value="Goods">Goods</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Destination Address</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="address"
              required
              onChange={(e) => {
                setDestinationAddress(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="date"
              required
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Distance (Km)</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="distance"
              required
              min="0"
              onChange={(e) => {
                setDistance(e.target.value);
                setTransportCost((e.target.value * 100 + 250).toFixed(2));
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time Of Dispatch</label>
            <input
              type="time"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="time"
              required
              onChange={(e) => {
                setTimeOfDispatch(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Driver</label>
            <select
              id="driver"
              name="driver"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
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
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="description"
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
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
            type="submit"
            className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default TransportNew;
