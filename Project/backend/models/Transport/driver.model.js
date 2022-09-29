import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DriverSchema = new Schema(
  {
    nic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
      maxlength: 12,
      pattern: '^[0-9]{9}[vVxX]$ | ^[0-9]{12}$',
    },
    fullName: {
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
      trim: true,
      minlength: 10,
      maxlength: 10,
      pattern: '^[0-9]{10}$',
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
    status: {
      type: String,
      required: true,
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model('driver', DriverSchema);

export default Driver;
