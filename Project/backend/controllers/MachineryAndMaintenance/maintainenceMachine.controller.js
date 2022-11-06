import MaintainenceMachine from "../../models/MachineryAndMaintenance/maintainenceMachine.model.js";


export const getAllMMaintainenceDetails = async (req, res) => {
    try {
        const maintainenceMachine = await MaintainenceMachine.aggregate([
            {
                $lookup: 
                {
                    from: "machinery",
                    localField: "machineID" ,
                    foreignField: "machineID",
                    as: "machineDetailss"
                }
            }
        ]);
        res.status(200).json(maintainenceMachine);    
    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const getOneMMaintainenceDetail = async (req, res) =>{
    try {
        const id= req.params.id;
       const maintainenceMachines= await MaintainenceMachine.findById(id);
        res.status(200).json(maintainenceMachines);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const createMMaintainenceDetails = async (req, res) =>{
    try {
        const maintainenceMachine = req.body;
        const newMaintainenceMachine = new MaintainenceMachine(maintainenceMachine);
        await newMaintainenceMachine.save();
        res.status(200).json(newMaintainenceMachine);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const updateMMaintainenceDetails = async (req, res) =>{
    try {
        const id= req.params.id;
        const maintainenceMachine = req.body;
        await MaintainenceMachine.findByIdAndUpdate(id, maintainenceMachine);
        res.status(200).json({
            status : "Maintainence details updated"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const deleteMMaintainenceDetails = async (req, res) =>{
    try {
        const id = req.params.id;
        await MaintainenceMachine.findByIdAndDelete(id);
        res.status(200).json({
        status : "Maintainence details deleted"
    })
        
    } catch (error) {
        res.status(404).json({ message : error});
    }

}



