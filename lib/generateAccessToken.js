import jwt from "jsonwebtoken"


export default function GenerateAccessToken (user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}