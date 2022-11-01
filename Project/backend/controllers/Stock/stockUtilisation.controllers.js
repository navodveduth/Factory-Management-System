import StockUtilisation from "../../models/Stock/stockUtilisation.models.js";  //always add the file extension .js

//includes all CRUD operations

//reading all stock details
export const getAllStockUtilDetails = async (req, res) => {
    try {//retrives stock details
        const stockUtil = await StockUtilisation.aggregate([
            {
                $lookup:
                {
                    from: "stocks",
                    localField: "stockCode",
                    foreignField: "stockCode",
                    as: "stockDetails"
                }
            }
        ]);
        res.status(200).json(stockUtil);  //200 and 404 are codes like success and error
    } catch (error) { //happens on error
        res.status(404).json({
            message: error
        })
    }
}

//reading details of one stock item
export const getOneStockUtilDetails = async (req, res) => {
    try {//retrieves stock based on id
        const id = req.params.id;
        const stockUtil = await StockUtilisation.findById(id);
        res.status(200).json(stockUtil);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//adding a stock item
export const addStockUtil = async (req , res) => {
    try {//gets values to add stock
        const stockUtil = req.body;
        const newStockUtil = new StockUtilisation(stockUtil);
        await newStockUtil.save();     //save to db
        res.status(200).json(newStockUtil);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//updating a stock item
export const updateStockUtil = async (req, res) => {
    try {//gets id and updates stock with new values
        const stockUtil = req.body;
        const id = req.params.id;
        await StockUtilisation.findByIdAndUpdate(id, stockUtil);
        res.status(200).json({
            status: "Stock utilisation " + id + " updated"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//deleting a stock
export const deleteStockUtil = async (req, res) => {
    try {//uses the id and deleted stock
        const id = req.params.id;
        await StockUtilisation.findByIdAndDelete(id);
        res.status(200).json({
            status: "Stock Utilisation Record "+ id + " deleted"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}
