
import Maintainence from "../../models/MachineryAndMaintenance/maintainence.model.js";


export const getAllMaintainenceDetails = async (req, res) => {
    try {
        const maintainence = await Maintainence.find();
        res.status(200).json(maintainence);    
    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const getOneMaintainenceDetail = async (req, res) =>{
    try {
        const id= req.params.id;
       const maintainences= await Maintainence.findById(id);
        res.status(200).json(maintainences);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const createMaintainenceDetails = async (req, res) =>{
    try {
        const maintainence = req.body;
        const newMaintainence = new Maintainence(maintainence);
        await newMaintainence.save();
        res.status(200).json(newMaintainence);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const updateMaintainenceDetails = async (req, res) =>{
    try {
        const id= req.params.id;
        const maintainence = req.body;
        await Maintainence.findByIdAndUpdate(id, maintainence);
        res.status(200).json({
            status : "Maintainence details updated"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const deleteMaintainenceDetails = async (req, res) =>{
    try {
        const id = req.params.id;
        await Maintainence.findByIdAndDelete(id);
        res.status(200).json({
        status : "Maintainence details deleted"
    })
        
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const getDateRangePropertyMaint = async (req, res) => {
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const Maintainences = await Maintainence.aggregate([
        
            {
                $match: { lastMaintainedDate: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(Maintainences);
    } catch (error) {
        res.status(404).json({message : error});
    }
}



