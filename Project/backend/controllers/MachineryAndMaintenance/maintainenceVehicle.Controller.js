import MaintainenceVehicle from "../../models/MachineryAndMaintenance/maintainenceVehicle.model.js";


export const getAllVMaintainenceDetails = async (req, res) => {
    try {
        const maintainenceVehicle = await MaintainenceVehicle.aggregate([
            {
                $lookup:{
                    from: "driver",
                    localField: "vehicleNo" ,
                    foreignField: "vehicleNo",
                    as: "vehicleDetails"
                }
            }
        ]);
        res.status(200).json(maintainenceVehicle);    
    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const getOneVMaintainenceDetail = async (req, res) =>{
    try {
        const id= req.params.id;
       const maintainenceVehicles= await MaintainenceVehicle.findById(id);
        res.status(200).json(maintainenceVehicles);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const createVMaintainenceDetails = async (req, res) =>{
    try {
        const maintainenceVehicle = req.body;
        const newmaintainenceVehicle = new MaintainenceVehicle(maintainenceVehicle);
        await newmaintainenceVehicle.save();
        res.status(200).json(newmaintainenceVehicle);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const updateVMaintainenceDetails = async (req, res) =>{
    try {
        const id= req.params.id;
        const maintainenceVehicle = req.body;
        await MaintainenceVehicle.findByIdAndUpdate(id, maintainenceVehicle);
        res.status(200).json({
            status : "Maintainence details updated"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const deleteVMaintainenceDetails = async (req, res) =>{
    try {
        const id = req.params.id;
        await MaintainenceVehicle.findByIdAndDelete(id);
        res.status(200).json({
        status : "Maintainence details deleted"
    })
        
    } catch (error) {
        res.status(404).json({ message : error});
    }

}



