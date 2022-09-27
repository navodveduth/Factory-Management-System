import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSupplierDetails = () => {
  const navigate = useNavigate();

  const [companyname, setCompanyname] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [orderCapacity, setOrderCapacity] = useState("");    


  return (
    <div>
      <h1>Add Supplier Details</h1>
      

 <form
        onSubmit={async (e) => {
          e.preventDefault();

          const newSupplier = {
            companyname,
            contactPerson,
            email,
            phone,
            address,
            productDetails,
            leadTime,
            orderCapacity,
          };

          await axios
            .post("http://localhost:8070/supplier/create", newSupplier)
            .then((res) => {
              alert("Supplier details added successfully");
              navigate("/supplier");
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <div className="form-group">
          <label for="companyname">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyname"
            placeholder="Enter Company Name"
            value={companyname}
            onChange={(e) => {
              setCompanyname(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="contactPerson">Contact Person</label>
          <input
            type="text"
            className="form-control"
            id="contactPerson"
            placeholder="Enter Contact Person"
            value={contactPerson}
            onChange={(e) => {
              setContactPerson(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="productDetails">Product Details</label>
          <input
            type="text"
            className="form-control"
            id="productDetails"
            placeholder="Enter Product Details"
            value={productDetails}
            onChange={(e) => {
              setProductDetails(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="leadTime">Lead Time</label>
          <input
            type="text"
            className="form-control"
            id="leadTime"
            placeholder="Enter Lead Time"
            value={leadTime}
            onChange={(e) => {
              setLeadTime(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label for="orderCapacity">Order Capacity</label>
          <input
            type="text"
            className="form-control"
            id="orderCapacity"
            placeholder="Enter Order Capacity"
            value={orderCapacity}
            onChange={(e) => {
              setOrderCapacity(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#FF5A5F" }}
        >
          Submit
        </button>
      </form>
    </div>
    
  )
}

export default AddSupplierDetails
