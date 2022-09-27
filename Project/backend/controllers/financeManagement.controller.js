import FD from "../models/financeManagement.model.js";

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

export const viewFDByRevenue = async (req, res) => {
    try {
        const amount = req.params.revenue;
        const financedata = await FD.find({
            revenue : amount
          });

       /*  const financedata = await FD.collection.aggregate([
            {
                $addFields: {
                    date: {
                        $dateToString: { 
                            format: "%Y-%m-%d",
                            date: "$recordedDate"
                        }
                    }
                }
            },
            {
                $match: {
                    date: date
                }
            }
        ]).toArray(); */
        res.status(200).json(financedata);
    } catch (error) {
        res.status(404).json({
            message : error
        })
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
        res.status(400).json({
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
