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

//date sort
export const getDateRangePendingStock = async (req, res) => {
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const pendingStockDate = await StockPending.aggregate([
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
                $match: { date: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(pendingStockDate);
    } catch (error) {
        res.status(404).json({message : error});
    }
}

//get one stock status
export const getOneStockStatus = async (req, res) => {
    try {
        const stat = req.params.ST;

        var paramtype = "";
        if(stat === "Pending"){
            paramtype = "Pending"
        }else if(stat === "Processing"){
            paramtype = "Processing"
        }else{
            paramtype = "Resolved"
        }
        const pstockType = await StockPending.find(
            {
                "status": paramtype
            }
        );
        res.status(200).json(pstockType);
    } catch (error) {
        res.status(404).json({message : error});
    }
}