import User from "../models/users.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        req.status(404).json({message : error});
    }
}

export const createUser = async (req, res) =>{
    try {
        const users = req.body;
        const newUser = new User(users);
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(404).json({ message : error});
    }

}

export const getOneUser = async (req, res) => {
        try {
            const user = req.params.userName;
            const users = await User.find({
                userName: user
            });
            res.status(200).json(users);
        } catch (error) {
            req.status(404).json({message : error});
        }
    }