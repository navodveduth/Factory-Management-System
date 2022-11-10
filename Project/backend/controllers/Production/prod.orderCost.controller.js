import mongoose from "mongoose";
import orderCost from "../../models/Production/prod.order.orderCost.model.js"
import Sales from "../../models/Sales/sales.model.js"

//All CRUD Operations regarding this schema will happen here

export const getDateRangeProduction = async (req, res) => {
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const productionData = await orderCost.aggregate([
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
                $match: { costedDate: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(productionData);
    } catch (error) {
        res.status(404).json({message : error});
    }
}


//get the status of the sale according to the invoice 

//****************** GET THE INVOICE DETAILS FROM THE INVOICE NUMBER IN SALES TABLE ******************
export const getFromInvoice = async(req,res)=>{
    try{
        const invoice = req.params.invoiceNo;
        const sale = await Sales.findOne({invoiceNo: invoice });
        res.status(200).json(sale);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}

export const updateCost = async(req,res)=>{
    try {
        const invoice= req.params.invoiceNo;
        const order = req.body;
        await orderCost.findOneAndUpdate(invoice, order);
        res.status(200).json({
            status : "Granted Stock Finalized"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }
}


//****************** GET THE INVOICE DETAILS FROM THE INVOICE NUMBER IN PRODUCTION TABLE ******************
export const getOrderFromInvoice = async(req,res)=>{
    try{
        const invoice = req.params.invoiceNo;
        const order = await orderCost.findOne({invoiceNo: invoice });
        res.status(200).json(order);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}

//set the sale status only 
//****************** UPDATE THE STATUS ACCORDING TO THE INVOICE ***********
export const setSaleStatus = async(req,res)=>{
    try{
      //  const invoice = req.params.invoiceNo;
        const setStatus = req.body.status;
        const invoiceNo = req.params.invoiceNo;
        const setSaleStatus = await Sales.updateOne({invoiceNo: invoiceNo},{$set:{status: setStatus}});
        res.status(200).json(setSaleStatus);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}

//Get All info relating to orderCost

export const getAllOrders = async(req,res)=>{
    try{
        const order = await orderCost.find();
        res.status(200).json(order);
    }catch(error){
        res.status(404).json(({
            message: error
        }));
    }
}


export const getOneOrder = async (req, res) =>{
    try {
        const id= req.params.id;
       const order = await orderCost.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const createOrder = async(req,res)=>{
    try{
        const order = req.body;
        const newOrder = new orderCost(order);
        await newOrder.save(); 
        res.status(200).json(newOrder);
    }catch(error){
        res.status(404).json({
            message: error
        });
    }
}

export const updateOrderDetails = async(req,res)=>{
    try {
        const id= req.params.id;
        const order = req.body;
        await orderCost.findByIdAndUpdate(id, order);
        res.status(200).json({
            status : "Order details updated"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const deleteOrder = async(req,res)=>{
    try{
        const id = req.params.id;
        await orderCost.findByIdAndDelete(id);
        res.status(200).json({
            status: "Order details deleted"
        })
    }catch(error){
        res.status(404).json({message: error});
    }
}

export const showPending = async (req,res) =>{
    try{
        const order = await orderCost.aggregate([
            {
                $match : {_id: new mongoose.Types.ObjectId(id)},
            },
            {
                $lookup:
                {
                    from: "sales",
                    localField: "invoiceNo",
                    foreignField: "invoiceNo",
                    as: "orderStatus"
                }
            }
        ]);
        res.status(200).json(order);
    }catch(error){
        res.status(404).json({message: error});
    }
}
