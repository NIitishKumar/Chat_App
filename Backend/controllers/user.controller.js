import User from "../models/user.model.js"

export const getUserForSidebar = async (req, res) => {
try {
    const allUsers = await  User.find({}).select("-password");

    // const loggedInUser = req.user._id
    // const allUsers = await  User.find({ _id : {$ne : loggedInUser}}).select("-password");

    res.status(200).json(allUsers)

} catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error"})
}
}