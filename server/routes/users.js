import express from "express"
import  { check, validationResult } from "express-validator"
import { DeleteUser, createUser, getUsers } from "../controllers/user.js";
import { admin, auth } from "../middleware/auth.js";


const Router = express.Router();

Router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['admin', 'user']),
], createUser);

Router.get('/all', auth, getUsers);

Router.delete('/:id', auth ,DeleteUser);



export default Router;