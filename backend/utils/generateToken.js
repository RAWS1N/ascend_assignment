import jwt from 'jsonwebtoken'

// generating token with 7 days expiry
const generateToken = (id) => {
    const token = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "7d"
    })
    return token
}


export default generateToken