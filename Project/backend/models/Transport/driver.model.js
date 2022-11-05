import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DriverSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    drivingLicenseNo: {
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
