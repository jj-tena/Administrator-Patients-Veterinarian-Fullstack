import Veterinary from "../models/Veterinary.js";

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
    res.json({
        msg: 'Returning profile'
    });
}

const confirm = (req, res) => {
    req.params.token;
    res.json({
        msg: 'Returning profile'
    });
}


export {
    register,
    profile,
    confirm,
}