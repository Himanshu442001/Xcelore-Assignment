import express from "express"
import  { check, validationResult } from "express-validator"
import { Login } from "../controllers/auth.js";

const Router = express.Router();

Router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
], Login);

export default Router;