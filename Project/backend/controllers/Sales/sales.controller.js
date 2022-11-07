import Sales from "../../models/Sales/sales.model.js";
import mongoose from "mongoose";

export const getAllSalesDetails = async (req, res) => {
    try {
        const sales = await Sales.aggregate([
            {
                $lookup: 
                {
                    from: "customers",
                    localField: "customerID" ,
                    foreignField: "customerID",
                    as: "customerDetailss"
                }
            }
        ]);
        res.status(200).json(sales);
    } catch (error) {
        res.status(404).json({message : error});
    }
}

export const getOneOrderDetail = async (req, res) =>{
    try {
        const id= req.params.id;
        const invoice = await Sales.findById(id);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const printOneInvoice = async (req, res) =>{
    try {
        const id= req.params.id;
        const invoice = await Sales.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: 
                {
                    from: "customers",
                    localField: "customerID" ,
                    foreignField: "customerID",
                    as: "customerDetailss"
                }
            }  
        ]);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const createOrder = async (req, res) =>{
    try {
        const sale = req.body;
        const newSales = new Sales(sale);
        await newSales.save();
        res.status(200).json(newSales);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const updateOrderDetails = async (req, res) =>{
    try {
        const id= req.params.id;
        const sales = req.body;
        await Sales.findByIdAndUpdate(id, sales);
        res.status(200).json({
            status : "Order details updated"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const deleteOrderDetails = async (req, res) =>{
    try {
        const id = req.params.id;
        await Sales.findByIdAndDelete(id);
        res.status(200).json({
        status : "Order details deleted"
    })
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const getSalesByDateRange = async (req, res) =>{
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const invoices = await Sales.aggregate([
            {
                $match: { orderDate: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(invoices);
    } catch (error) {
        res.status(404).json({message : error});
    }
}