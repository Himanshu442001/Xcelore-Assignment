import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from  "jsonwebtoken";


export const createUser = async(req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user =  new User({
            name,
            email,
            password,
            role,
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token,user) => {
                if (err) throw err;
                 res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).json({ sucess:false,
            error: 'Server error' });
    }

}



export const DeleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.deleteOne();
        res.json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await User.countDocuments(query);
        res.json({ users, total });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};