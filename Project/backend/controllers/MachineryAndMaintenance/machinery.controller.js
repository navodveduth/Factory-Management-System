import Machinery from "../../models/MachineryAndMaintenance/machinery.model.js";

export const getAllMachineryDetails = async (req, res) => {
    try {
        const machinery = await Machinery.aggregate([
            {
                $lookup: 
                {
                    from: "maintainencemachines",
                    localField: "machineID" ,
                    foreignField: "machineID",
                    as: "machineDetails"
                }
            }
        ]);
        res.status(200).json(machinery);    
    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const getOneMachineryDetail = async (req, res) =>{
    try {
        const id= req.params.id;
       const machineries= await Machinery.findById(id);
        res.status(200).json(machineries);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const createMachineryDetails = async (req, res) =>{
    try {
        const machinery = req.body;
        const newMachinery = new Machinery(machinery);
         await newMachinery.save();
        res.status(200).json(newMachinery);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const updateMachineryDetails = async (req, res) =>{
    try {
        const id= req.params.id;
        const machinery = req.body;
        await Machinery.findByIdAndUpdate(id, machinery);
        res.status(200).json({
            status : "Machinery details updated"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const deleteMachineryDetails = async (req, res) =>{
    try {
        const id = req.params.id;
        await Machinery.findByIdAndDelete(id);
        res.status(200).json({
        status : "Machinery details deleted"
    })
        
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const getDateRangeMachinery = async (req, res) => {
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const machinery = await Machinery.aggregate([
        
            {
                $match: { dateOfPurchased: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(machinery);
    } catch (error) {
        res.status(404).json({message : error});
    }
}