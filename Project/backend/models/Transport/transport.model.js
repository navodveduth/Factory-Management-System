import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transportSchema = new Schema(
  {
    type: {
      // Staff, Employee, Goods
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
      minlength: 1,
      default: 0.0,
    },
    timeOfDispatch: {
      type: String,
      required: true,
    },
    transportCost: {
      type: Number,
      required: true,
      minlength: 1,
      default: 0.0,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    driver: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transport = mongoose.model('transport', transportSchema);

export default Transport;
