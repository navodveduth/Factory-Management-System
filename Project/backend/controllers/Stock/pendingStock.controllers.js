import StockPending from "../../models/Stock/pendingStock.models.js";  //always add the file extension .js

//includes all CRUD operations

//reading all stock details
export const getAllPendingStocks = async (req, res) => {
    try {//retrives stock details
        const pendingStock = await StockPending.find();
        res.status(200).json(pendingStock);  //200 and 404 are codes like success and error
    } catch (error) { //happens on error
        res.status(404).json({
            message: error
        })
    }
}

//reading details of one stock item
export const getOnePendingStock = async (req, res) => {
    try {//retrieves stock based on id
        const id = req.params.id;
        const pendingStock = await StockPending.findById(id);
        res.status(200).json(pendingStock);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//adding a stock item
export const addPendingStock = async (req , res) => {
    try {//gets values to add stock
        const pendingStock = req.body;
        const newPendingStock = new StockPending(pendingStock);
        await newPendingStock.save();     //save to db
        res.status(200).json(newPendingStock);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//updating a stock item
export const updatePendingStock = async (req, res) => {
    try {//gets id and updates stock with new values
        const pendingStock = req.body;
        const id = req.params.id;
        await StockPending.findByIdAndUpdate(id, pendingStock);
        res.status(200).json({
            status: "Pending Stock updated"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//deleting a stock
export const deletePendingStock = async (req, res) => {
    try {//uses the id and deleted stock
        const id = req.params.id;
        await StockPending.findByIdAndDelete(id);
        res.status(200).json({
            status: "Pending Stock deleted"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}