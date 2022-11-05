import DamagedStock from "../../models/Stock/damagedStock.models.js";  //always add the file extension .js

//includes all CRUD operations

//reading all stock details
export const getAllDamagedStockDetails = async (req, res) => {
    try {//retrives stock details
        const damagedStocks = await DamagedStock.find();
        res.status(200).json(damagedStocks);  //200 and 404 are codes like success and error
    } catch (error) { //happens on error
        res.status(404).json({
            message: error
        })
    }
}

//reading details of one stock item
export const getOneDamagedStockDetails = async (req, res) => {
    try {//retrieves stock based on id
        const id = req.params.id;
        const damagedStock = await DamagedStock.findById(id);
        res.status(200).json(damagedStock);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//adding a stock item
export const addDamagedStock = async (req , res) => {
    try {//gets values to add stock
        const damagedStock = req.body;
        const newDamagedStock = new DamagedStock(damagedStock);
        await newDamagedStock.save();     //save to db
        res.status(200).json(newDamagedStock);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//updating a stock item
export const updateDamagedStock = async (req, res) => {
    try {//gets id and updates stock with new values
        const damagedStock = req.body;
        const id = req.params.id;
        await DamagedStock.findByIdAndUpdate(id, damagedStock);
        res.status(200).json({
            status: "Damaged Stock updated"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//deleting a stock
export const deleteDamagedStock = async (req, res) => {
    try {//uses the id and deleted stock
        const id = req.params.id;
        await DamagedStock.findByIdAndDelete(id);
        res.status(200).json({
            status: "Damaged Stock deleted"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}