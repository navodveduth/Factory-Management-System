import mongoose from "mongoose";
import Stock from "../../models/Stock/stock.models.js";  //always add the file extension .js
import production from "../../models/Production/prod.order.orderCost.model.js";

//includes all CRUD operations

//reading all stock details
export const getAllStockDetails = async (req, res) => {
    try {//retrives stock details
        const stocks = await Stock.aggregate([
            {
                $lookup:
                {
                    from: "stockutilisations",
                    localField: "stockCode",
                    foreignField: "stockCode",
                    as: "stockUtilisationDetails"
                }
            }
        ]);
        res.status(200).json(stocks);  //200 and 404 are codes like success and error
    } catch (error) { //happens on error
        res.status(404).json({
            message: error
        })
    }
}

//reading details of one stock item
export const getOneStockDetails = async (req, res) => {
    try {//retrieves stock based on id
        const id = req.params.id;
        const stock = await Stock.findById(id);
        res.status(200).json(stock);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//get one stock info
export const getOneStockInfo = async (req, res) => {
    try {//retrieves stock based on id
        const id = req.params.id;
        const stock = await Stock.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(id)},},
            {$lookup: {
                from: 'stockutilisations',
                localField: 'stockCode',
                foreignField: 'stockCode',
                as: 'stockUtilisationDetails',
            },
        }, 
        ]);
        res.status(200).json(stock);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//adding a stock item
export const addStock = async (req , res) => {
    try {//gets values to add stock
        const stock = req.body;
        const newStock = new Stock(stock);
        await newStock.save();     //save to db
        res.status(200).json(newStock);
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//updating a stock item
export const updateStock = async (req, res) => {
    try {//gets id and updates stock with new values
        const stock = req.body;
        const id = req.params.id;
        await Stock.findByIdAndUpdate(id, stock);
        res.status(200).json({
            status: "Stock updated"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//deleting a stock
export const deleteStock = async (req, res) => {
    try {//uses the id and deleted stock
        const id = req.params.id;
        await Stock.findByIdAndDelete(id);
        res.status(200).json({
            status: "Stock deleted"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//date sort
export const getDateRangeStock = async (req, res) => {
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const stockDate = await Stock.aggregate([
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
                $match: { firstPurchaseDate: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(stockDate);
    } catch (error) {
        res.status(404).json({message : error});
    }
}

//get one stock category
export const getOneStockCategory = async (req, res) => {
    try {
        const cat = req.params.categ;

        var category = "";
        if(cat === "Raw materials"){
            category = "Raw materials"
        }else{
            category = "Work in progress"
        }
        const stockCat = await Stock.find(
            {
                "stockCategory": category
            }
        );
        res.status(200).json(stockCat);
    } catch (error) {
        res.status(404).json({message : error});
    }
}

export const getOneStockByStockCode = async (req, res) =>{
    try {
        const stockID= req.params.stockID;
       const stock= await Stock.find({'stockCode': stockID});
        res.status(200).json(stock);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const updateStockByStockCode = async (req, res) => {
    try {//gets id and updates stock with new values
        const stock = req.body;
        const id = req.params.id;
        await Stock.updateOne(id, stock);
        res.status(200).json({
            status: "Stock updated"
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

//getting order from production
export const getOrderFromInvoice = async(req,res)=>{
    try{
        const invoice = req.params.invoiceNo;
        const order = await production.findOne({invoiceNo: invoice });
        res.status(200).json(order);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}

export const getOneStockByStockName = async (req, res) =>{
    try {
        const stockID= req.params.name;
       const stock= await Stock.find({'stockName': stockID});
        res.status(200).json(stock);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

//****************** UPDATE THE STATUS ACCORDING TO THE INVOICE ***********
export const setProductionStatus = async(req,res)=>{
    try{
      //  const invoice = req.params.invoiceNo;
        const setStatus = req.body.status;
        const invoiceNo = req.params.invoiceNo;
        const setSaleStatus = await production.updateOne({invoiceNo: invoiceNo},{$set:{status: setStatus}});
        res.status(200).json(setSaleStatus);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}