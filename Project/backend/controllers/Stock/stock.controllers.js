import Stock from "../../models/Stock/stock.models.js";  //always add the file extension .js

//includes all CRUD operations

//reading all stock details
export const getAllStockDetails = async (req, res) => {
    try {//retrives stock details
        const stocks = await Stock.aggregate([
            {
                $lookup:
                {
                    from: "stockUtilisations",
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

//reading details of one stock category
// export const getOneStockCategory = async (req, res) => {
//     try {//retrieves stock based on id
//         const stockCategory = req.body.stockCategory;
//         const stock = await Stock.find(stockCategory);
//         res.status(200).json(stock);
//     } catch (error) {
//         res.status(404).json({
//             message: error
//         })
//     }
// }

// export const viewFDByRevenue = async (req, res) => {
//     try {
//         const amount = req.params.revenue;
//         const financedata = await FD.find({
//             revenue : amount
//           });

//        /*  const financedata = await FD.collection.aggregate([
//             {
//                 $addFields: {
//                     date: {
//                         $dateToString: {
//                             format: "%Y-%m-%d",
//                             date: "$recordedDate"
//                         }
//                     }
//                 }
//             },
//             {
//                 $match: {
//                     date: date
//                 }
//             }
//         ]).toArray(); */
//         res.status(200).json(financedata);
//     } catch (error) {
//         res.status(404).json({
//             message : error
//         })
//     }
// }