import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

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
  const [description, setDescription] = useState('');

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
        setDescription(res.data.description);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
      <Header category="Form" title="Update Transport" />
      <div className="flex items-center justify-center">
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
              description,
            };

            await axios
              .put('http://localhost:8070/transport/update/' + id, newTransport)
              .then((res) => {
                alert('Transport Details Updated');
                navigate('/TransportViewAll');
              })
              .catch((err) => {
                console.log(err);
                alert('Error in Updating Transport Details');
              });
          }}
        >
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select
              id="type"
              name="type"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              value={type}
              required
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
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
              value={destinationAddress}
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
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Distance</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="distance"
              value={distance}
              min="0"
              onChange={(e) => {
                setDistance(e.target.value);
                setTransportCost(e.target.value * 100 + 250);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time Of Dispatch</label>
            <input
              type="time"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="time"
              value={timeOfDispatch}
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
              value={driver}
              onChange={(e) => {
                setDriver(e.target.value);
              }}
            >
              {drivers.map((item, index) => (
                <option value={item.fullName} key={index}>
                  {item.fullName}
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
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              required
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-red-800 text-lg text-white left-10 p-3 my-4 rounded-lg hover:bg-red-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransportUpdate;
