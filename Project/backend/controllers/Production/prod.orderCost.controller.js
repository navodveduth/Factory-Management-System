import orderCost from "../../models/Production/prod.order.orderCost.model.js"

//All CRUD Operations regarding this schema will happen here

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

export const createOrder = async(req,res)=>{
    try{
        const order = req.body;
        const newOrder = new orderCost(order);
        await newOrder.save(); 
        res.status(200).json(order);
    }catch(error){
        res.status(404).json({
            message: error
        });
    }
}



