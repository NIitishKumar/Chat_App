import jwt from "jsonwebtoken";

const generateTokenAndSetCookie= (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "10d"

    })
    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict",
    })
}
export default generateTokenAndSetCookie;