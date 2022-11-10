import Customer from "../../models/Sales/customer.model.js";
import mongoose from "mongoose";

export const getAllCustomers = async (req, res) => {
    try {
        // const customer = await Customer.find();
        const customer =  await Customer.aggregate([    //SELECT ALL FROM TESTSALES TS,TESTCUSTOMER TC WHERE TS.CUSTOMERNAME = TC.CUSTOMERNAME AS CUSTOEMRDETAILS
            {
                $lookup: 
                {
                    from: "sales",
                    localField: "customerID" ,
                    foreignField: "customerID",
                    as: "customerDetails"
                }
            }
        ]);
        res.status(200).json(customer);

    } catch (error) {
        res.status(404).json({message : error});
    }
}

export const getOneCustomer = async (req, res) =>{
    try {
        const id= req.params.id;
        const customer = await Customer.findById(id);
        // const customer= await Customer.aggregate([
        //     {
        //         $match: { _id: new mongoose.Types.ObjectId(id) }
        //     },
        //     {
        //         $lookup: 
        //         {
        //             from: "sales",
        //             localField: "customerID" ,
        //             foreignField: "customerID",
        //             as: "customerDetails"
        //         }
        //     }  
        // ]);
        res.status(200).json(customer);

    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const createCustomer = async (req, res) =>{
    try {
        const customer = req.body;
        const newCustomer = new Customer(customer);
        await newCustomer.save();
        res.status(200).json(newCustomer);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const updateCustomer = async (req, res) =>{
    try {
        const id= req.params.id;
        const customer = req.body;
        
        await Customer.findByIdAndUpdate(id, customer);
        res.status(200).json({
            status : "Customer details updated"
        });

    } catch (error) {
        res.status(404).json({ message : error});
    }
}

export const deleteCustomer = async (req, res) =>{
    try {
        const id = req.params.id;
        await Customer.findByIdAndDelete(id);
        res.status(200).json({
        status : "Customer details deleted"
    })
    } catch (error) {
        res.status(404).json({ message : error});
    }

}