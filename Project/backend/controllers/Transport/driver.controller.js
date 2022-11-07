import Driver from '../../models/Transport/driver.model.js';
import employee from '../../models/Employee/employee.model.js';

// @desc    Fetch all driver details
// @route   GET /driver
// @access  Public
export const getDriverDetails = async (req, res) => {
  try {
    const drivers = await Driver.aggregate([
      // Aggregate is used to join two collections
      {
        $lookup: {
          // Lookup is used to join two collections
          from: 'employees', // Collection name
          localField: 'fullName', // Field name in the current collection
          foreignField: 'employeeFullName', // Field name in the other collection
          as: 'driverDetails', // Name of the new field in the current collection
        },
      },
    ]);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    Fetch a driver detail
// @route   GET /driver/:id
// @access  Public
export const getDriverDetailById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json(driver);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    Create a driver detail
// @route   POST /driver
// @access  Public
export const createDriverDetails = async (req, res) => {
  try {
    const driver = req.body;
    const newDriver = new Driver(driver);
    await newDriver.save();
    res.status(200).json(newDriver);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    Update a driver detail
// @route   PATCH /driver/:id
// @access  Public
export const updateDriverDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const driver = req.body;
    await Driver.findByIdAndUpdate(id, driver);
    res.status(200).json({
      status: 'Driver details updated successfully',
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteDriverDetails = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Driver details deleted successfully',
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
