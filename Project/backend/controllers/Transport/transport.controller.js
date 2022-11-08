import Transport from '../../models/Transport/transport.model.js';

// @desc    Fetch all transport details
// @route   GET /transport
// @access  Public
export const getTransportDetails = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.status(200).json(transports);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    Fetch a transport detail
// @route   GET /transport/:id
// @access  Public
export const getTransportDetailById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    res.status(200).json(transport);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getDateRangeTransport = async (req, res) => {
  try {
    const DS = req.params.DS;
    const DE = req.params.DE;
    const data = await Transport.aggregate([
      {
        $match: { date: { $gte: new Date(DS), $lte: new Date(DE) } },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    Create a transport detail
// @route   POST /transport
// @access  Public
export const createTransportDetails = async (req, res) => {
  try {
    const transport = req.body;
    const newTransport = new Transport(transport);
    await newTransport.save();
    res.status(200).json(newTransport);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// @desc    Update a transport detail
// @route   PATCH /transport/:id
// @access  Public
export const updateTransportDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const transport = req.body;
    await Transport.findByIdAndUpdate(id, transport);
    res.status(200).json({
      status: 'Transport details updated successfully',
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteTransportDetails = async (req, res) => {
  try {
    await Transport.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Transport details deleted successfully',
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
