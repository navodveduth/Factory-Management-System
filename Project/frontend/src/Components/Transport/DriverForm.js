import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Driver = () => {
  const navigate = useNavigate(); // This is a hook that allows us to navigate to a different route

  const [nic, setNic] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  return (
    <div className='container'>
      <h1>Driver Form</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault(); // prevent the page from reloading

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
              navigate('/driver');
            })
            .catch((err) => {
              console.log(err);
              alert('Error in Adding Driver Details');
            });
        }}
      >
        <div className='mb-3'>
          <label className='form-label'>NIC</label>
          <input
            type='text'
            className='form-control'
            id='nic'
            required
            onChange={(e) => {
              setNic(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Driving License Number</label>
          <input
            type='text'
            className='form-control'
            id='drivingLicenseNo'
            required
            onChange={(e) => {
              setDrivingLicenseNo(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Contact Number</label>
          <input
            type='number'
            className='form-control'
            id='contactNo'
            required
            onChange={(e) => {
              setContactNo(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Vehicle Number</label>
          <input
            type='text'
            className='form-control'
            id='vehicleNo'
            required
            onChange={(e) => {
              setVehicleNo(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Vehicle Model</label>
          <input
            type='text'
            className='form-control'
            id='vehicleModel'
            required
            onChange={(e) => {
              setVehicleModel(e.target.value);
            }}
          />
        </div>
        <button
          type='submit'
          className='btn btn-light'
          required
          style={{ backgroundColor: '#FF5A5F' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Driver;
