import jwt from 'jsonwebtoken';
import Veterinary from '../models/Veterinary.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.veterinary = await Veterinary.findById(decoded.id).select(
                "-password -token -confirmed"
            );
            return next();
        } catch (error) {
            const e = new Error('Token not valid');
            res.status(403).json({msg: e});
        }
    } 
    if (!token) {
        const error = new Error('Token not valid or non-existent');
        res.status(403).json({msg: error.message});
    }
    next();
}

export default checkAuth;