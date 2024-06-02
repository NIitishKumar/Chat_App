import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        res.status(500).json({erroe:"Internal server error"})
    }
}
export const signup = async (req, res) => {
    try {
        
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error : "Password doesn't match!"})
        }
        const all = User.find({}).lean();
        
        const user = await User.findOne({userName});
        
        if (user){
            return res.status(400).json({error: "User already exist"})
        }
        
        const borProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const gitlProfilePci = `https://avatar.iran.liara.run/public/girl?username=${userName}`
            let hashpwd = "";
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName,
            userName,
            password:hashPwd,
            gender,
            profilePic: gender == "male" ? borProfilePic : gitlProfilePci
        }) 
        if (newUser){
            const use = generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            newUser.save();
            return res.status(201).json({
                _id : newUser._id,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
                userName:newUser.userName
            })
        }

        res.send("Login")
        } catch (error) {
            console.log(error)
            res.status(500).json({erroe:"Internal server error"})
        }
}
export const login = async (req, res) => {
    try {
        const {userName, password} = req.body;

        const user = await User.findOne({userName, })

        const isPasswordCorrecrt = bcrypt.compare(password, user.password || "");
        
        if (!user || !isPasswordCorrecrt){
            return  res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(201).json({
            _id : user._id,
            fullName: user.fullName,
            profilePic: user.profilePic,
            userName:user.userName
        })

    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
}