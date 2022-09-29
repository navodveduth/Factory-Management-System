import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components';

const DriverUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nic, setNic] = useState('');
  const [fullName, setFullName] = useState('');
  const [drivingLicenseNo, setDrivingLicenseNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8070/driver/${id}`)
      .then((res) => {
        setNic(res.data.nic);
        setFullName(res.data.fullName);
        setDrivingLicenseNo(res.data.drivingLicenseNo);
        setContactNo(res.data.contactNo);
        setVehicleNo(res.data.vehicleNo);
        setVehicleModel(res.data.vehicleModel);
        setStatus(res.data.status);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  dark:bg-secondary-dark-bg dark:text-white ">
      <Header category="Form" title="Update Driver" />
      <div className="flex items-center justify-center">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const newDriver = {
              nic,
              fullName,
              drivingLicenseNo,
              contactNo,
              vehicleNo,
              vehicleModel,
              status,
            };

            await axios
              .put(`http://localhost:8070/driver/update/${id}`, newDriver)
              .then((res) => {
                alert('Driver Details Updated');
                navigate('/DriverViewAll');
              })
              .catch((err) => {
                console.log(err);
                alert('Error in Updating Driver Details');
              });
          }}
        >
          <div className="mb-3">
            <label className="form-label">NIC</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="nic"
              value={nic}
              onChange={(e) => {
                setNic(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Driving License Number</label>
            <input
              type="text"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              id="drivingLicenseNo"
              value={drivingLicenseNo}
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
              value={contactNo}
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
              value={vehicleNo}
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
              value={vehicleModel}
              onChange={(e) => {
                setVehicleModel(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-800 rounded-md bg-gray-100 focus:bg-white dark:text-black"
              value={status}
              required
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
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

export default DriverUpdate;
