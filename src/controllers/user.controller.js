import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json({ message: 'Protected route accessed', data: users });
}

export const getUserById = async (req, res) => {
    const userId = req.params.id
    const user = await User.find({ _id: userId })
    res.status(200).json({ message: 'User Data fetched', data: user });
}

export const updateUser = async (req, res) => {
    const userId = req.params.id
    await User.updateOne({ _id: userId}, req.body)
    const user = await User.find({ _id: userId })
    res.status(200).json({ message: 'User Updated Succesfully', data: user });
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id
    const user = await User.deleteOne({ _id: userId })
    res.status(200).json({ message: 'User Deleted Succesfully', data: user });
}