import jwt from "jsonwebtoken"
import { User } from "../server/models/User.js";


export const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
        if (!token) {
        return res.status(401).json({ 

            sucess:false,
            msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({
            sucess:false,
            msg: 'Token is not valid' });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            sucess:false,
            msg: 'Access denied, admin only' });
    }
};



