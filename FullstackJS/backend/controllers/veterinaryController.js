import Veterinary from "../models/Veterinary.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";

const register = async (req, res) => {
    const {email} = req.body;
    const userExists = await Veterinary.findOne({ email: email });
    if(userExists){
        const error = new Error('User already existing');
        return res.status(400).json({msg: error.message});
    }
    try {
        const veterinary = new Veterinary(req.body);
        const veterinarySaved = await veterinary.save();
        res.json({msg: 'Registering...'});
    } catch (error) {
        console.log(error)
    }
}

const profile = (req, res) => {
    const {veterinary} = req;
    res.json({
        profile: veterinary
    });
}

const confirm = async (req, res) => {
    const {token} = req.params;
    const userConfirm = await Veterinary.findOne({token})
    if (!userConfirm){
        const error = new Error('Token not valid');
        return res.status(404).json({msg: error.message});
    }
    try {
        userConfirm.token = null;
        userConfirm.confirmed = true;
        await userConfirm.save();
        res.json({msg: 'User confirmed'});
    } catch (error) {
        console.log(error)
    }
    
}

const authenticate = async (req, res) => {
    const {email, password} = req.body
    const user = await Veterinary.findOne({email})
    if (!user) {
        const error = new Error('User doesnt exists');
        return res.status(403).json({msg: error.message});
    }
    if (!user.confirmed){
        const error = new Error('User account havent been confirmed');
        return res.status(403).json({msg: error.message});
    }
    if (!await user.checkPassword(password)){
        const error = new Error('Incorrect password');
        return res.status(403).json({msg: error.message});
    }
    res.json({token: generateJWT(user.id)});
    
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    const veterinaryExists = await Veterinary.findOne({email});
    if (!veterinaryExists) {
        const error = new Error('User doesnt exists');
        return res.status(400).json({msg: error.message});
    }
    try {
        veterinaryExists.token = generateId()
        await veterinaryExists.save();
        res.json({msg: 'We have sent you an email with the instructions'});
    } catch (error) {
        console.log(error);
    }
}

const checkToken = async (req, res) => {
    const {token} = req.params;
    const validToken = await Veterinary.findOne({token})
    if (validToken) {
        res.json({msg: 'Token valid and user exists'});
    } else {
        const error = new Error('Token not valid');
        return res.status(400).json({msg: error.message});
    }
}

const newPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const userFound = await Veterinary.findOne({token})
    if (!userFound) {
        const error = new Error('Token not valid');
        return res.status(400).json({msg: error.message});
    }
    try {
        userFound.token = null;
        userFound.password = password;
        await userFound.save();
        res.json({msg: 'Password has been modified correctly'})
    } catch (error) {
        console.log(error);
    } 

}


export {
    register,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword
}