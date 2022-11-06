import FD from "../../models/Finance/financeManagement.model.js";

export const viewAllFinancialData = async (req ,res) => {
    try {
        const financedata = await FD.find();
        res.status(200).json(financedata);
    } catch (error) {
        res.status(404).json();
    }
}

export const viewOneFinancialData = async (req, res) => {
    try {
        
        const ID = req.params.id;
        const financedata = await FD.findById(ID)
        res.status(200).json(financedata);
    } catch (error) {
        res.status(404).json({
            message : error
        })
    }
}

export const getDateRangeFinance = async (req, res) => {
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const financedata = await FD.aggregate([
            /* {
                $lookup:
                {
                    from: "finances",
                    localField: "local",  
                    foreignField: "foreign", 
                    as: "newField" 
                }
            }, */
            {
                $match: { trnRecordedDate: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(financedata);
    } catch (error) {
        res.status(404).json({message : error});
    }
}

export const addFinancialData = async (req, res) => {
    try {
        const financedata = req.body;
        const newFinanceData = new FD (financedata);
        await newFinanceData.save();
        res.status(200).json(newFinanceData)
    } catch (error) {
        res.status(404).json({
            message : error
        })
    }
}

export const updateFinancialData = async (req, res) => {
    try {
        const financedata = req.body;
        const ID = req.params.id;
        await FD.findByIdAndUpdate(ID, financedata);
        res.status(200).json({
            status : "Financial Data Updated"
        })
    } catch (error) {
        res.status(404).json({
            message : error
        })
    }
}

export const deleteFinancialData = async (req, res) => {
    try {
        const ID = req.params.id;
        await FD.findByIdAndDelete(ID);
        res.status(200).json({
            status : "Financial Data Deleted"
        })
    
    } catch (error) {
        res.status(404).json({
            message : error
        })
    }
}
