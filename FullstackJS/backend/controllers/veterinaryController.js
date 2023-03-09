import Veterinary from "../models/Veterinary.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgotPassword from "../helpers/emailForgotPassword.js";

const register = async (req, res) => {
    const {email, name} = req.body;
    const userExists = await Veterinary.findOne({ email: email });
    if(userExists){
        const error = new Error('Esta cuenta ya existe');
        return res.status(400).json({msg: error.message});
    }
    try {
        const veterinary = new Veterinary(req.body);
        const veterinarySaved = await veterinary.save();
        emailRegister({
            email,
            name,
            token: veterinarySaved.token
        });
        res.json({msg: 'Registrando...'});
    } catch (error) {
        console.log(error)
    }
}

const profile = (req, res) => {
    const {veterinary} = req;
    res.json(veterinary);
}

const confirm = async (req, res) => {
    const {token} = req.params;
    const userConfirm = await Veterinary.findOne({token})
    if (!userConfirm){
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }
    try {
        userConfirm.token = null;
        userConfirm.confirmed = true;
        await userConfirm.save();
        res.json({msg: 'Usuario confirmado'});
    } catch (error) {
        console.log(error)
    }
    
}

const authenticate = async (req, res) => {
    const {email, password} = req.body
    const user = await Veterinary.findOne({email})
    if (!user) {
        const error = new Error('Esta cuenta no existe');
        return res.status(403).json({msg: error.message});
    }
    if (!user.confirmed){
        const error = new Error('Esta cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }
    if (!await user.checkPassword(password)){
        const error = new Error('Contraseña incorrecta');
        return res.status(403).json({msg: error.message});
    }
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWT(user.id),
    });
    
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    const veterinaryExists = await Veterinary.findOne({email});
    if (!veterinaryExists) {
        const error = new Error('Esta cuenta no existe');
        return res.status(400).json({msg: error.message});
    }
    try {
        veterinaryExists.token = generateId()
        await veterinaryExists.save();
        emailForgotPassword({
            email,
            name: veterinaryExists.name,
            token: veterinaryExists.token
        })
        res.json({msg: 'Te hemos enviado un correo con las instrucciones'});
    } catch (error) {
        console.log(error);
    }
}

const checkToken = async (req, res) => {
    const {token} = req.params;
    const validToken = await Veterinary.findOne({token})
    if (validToken) {
        res.json({msg: 'El token es válido y la cuenta existe'});
    } else {
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
}

const newPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const userFound = await Veterinary.findOne({token})
    if (!userFound) {
        const error = new Error('Token no válido');
        return res.status(400).json({msg: error.message});
    }
    try {
        userFound.token = null;
        userFound.password = password;
        await userFound.save();
        res.json({msg: 'La contraseña ha sido modificada correctamente'})
    } catch (error) {
        console.log(error);
    } 

}

const updateProfile = async (req, res) => {
    const veterinary = await Veterinary.findById(req.params.id);
    if (!veterinary) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }
    if (veterinary.email !== req.body.email) {
        const existsEmail = await Veterinary.findOne({email: req.body.email});
        if (existsEmail) {
            const error = new Error('Ese email ya está registrado');
            return res.status(400).json({msg: error.message});
        }
    }
    try {
        veterinary.name = req.body.name;
        veterinary.email = req.body.email;
        veterinary.web = req.body.web;
        veterinary.phoneNumber = req.body.phoneNumber;
        const veterinaryUpdated = await veterinary.save();
        res.json(veterinaryUpdated);
    } catch (error) {
        console.log(error);
    }
}

const updatePassword = async (req, res) => {
    const {id} = req.veterinary;
    const {current_password, new_password} = req.body;
    const veterinary = await Veterinary.findById(id);
    if (!veterinary) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});
    }
    if (await veterinary.checkPassword(current_password)){
        veterinary.password = new_password;
        await veterinary.save();
        res.json({msg: 'Password actualizado correctamente'});
    } else {
        const error = new Error('El password actual es incorrecto');
        return res.status(400).json({msg: error.message});
    }
}

export {
    register,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    checkToken,
    newPassword,
    updateProfile,
    updatePassword
}