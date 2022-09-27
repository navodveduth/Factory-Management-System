import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DriverSchema = new Schema(
  {
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    drivingLicenseNo: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleNo: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleImage: {
      type: String,
      required: false,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model('driver', DriverSchema);

export default Driver;
