import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DriverUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nic, setNic] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8070/driver/${id}`)
      .then((res) => {
        setNic(res.data.nic);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setDrivingLicenseNo(res.data.drivingLicenseNo);
        setContactNo(res.data.contactNo);
        setVehicleNo(res.data.vehicleNo);
        setVehicleModel(res.data.vehicleModel);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  return (
    <div className='container'>
      <h1>Driver Update Form</h1>
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
            .put('http://localhost:8070/driver/update/' + id, newDriver)
            .then((res) => {
              alert('Driver Details Updated');
              navigate('/driver');
            })
            .catch((err) => {
              console.log(err);
              alert('Error in Updating Driver Details');
            });
        }}
      >
        <div className='mb-3'>
          <label className='form-label'>NIC</label>
          <input
            type='text'
            className='form-control'
            id='nic'
            value={nic}
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
            value={firstName}
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
            value={lastName}
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
            value={drivingLicenseNo}
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
            value={contactNo}
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
            value={vehicleNo}
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
            value={vehicleModel}
            onChange={(e) => {
              setVehicleModel(e.target.value);
            }}
          />
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

export default DriverUpdate;
