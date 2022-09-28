/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

const DriverView = () => {
  const navigate = useNavigate(); // This is a hook that allows us to navigate to a different route

  const [nic, setNic] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
      <Header category="Form" title="New Driver" />
      <div className="flex items-center justify-center ">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const newDriver = {
              nic,
              firstName,
              lastName,
              drivingLicenseNo,
              contactNo,
              vehicleNo,
              vehicleModel,
            };

            await axios
              .post('http://localhost:8070/driver/create', newDriver)
              .then((res) => {
                alert('Driver Details Added');
                navigate('/DriverViewAll');
              })
              .catch((err) => {
                console.log(err);
                alert('Error in Adding Driver Details');
              });
          }}
        >
          <div className="mb-3">
            <label className="form-label">NIC</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="nic"
              required
              onChange={(e) => {
                setNic(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="firstName"
              required
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="lastName"
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Driving License Number</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="drivingLicenseNo"
              required
              onChange={(e) => {
                setDrivingLicenseNo(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="number"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="contactNo"
              required
              onChange={(e) => {
                setContactNo(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Vehicle Number</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="vehicleNo"
              required
              onChange={(e) => {
                setVehicleNo(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Vehicle Model</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="vehicleModel"
              required
              onChange={(e) => {
                setVehicleModel(e.target.value);
              }}
            />
          </div>

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
export default DriverView;
