import Patient from "../models/Patient.js"

const addPatient = async (req, res) => {
    const patient = new Patient(req.body);
    patient.veterinary = req.veterinary._id;
    try {
        const patientSaved = await patient.save();
        res.json(patientSaved);
    } catch (error) {
        console.log(error);
    }
}

const getPatients = async (req, res) => {
    const patients = await Patient.find().where('veterinary').equals(req.veterinary);
    res.json(patients)
}

const getPatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
        return res.status(404).json({msg: 'User not found'});
    }
    if (patient.veterinary.toString() !== req.veterinary._id.toString()) {
        return res.status(400).json({msg: 'Action not allowed'});
    }
    res.json(patient);
}

const updatePatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
        return res.status(404).json({msg: 'User not found'});
    }
    if (patient.veterinary.toString() !== req.veterinary._id.toString()) {
        return res.status(400).json({msg: 'Action not allowed'});
    }
    patient.name = req.body.name || patient.name;
    patient.owner = req.body.owner || patient.owner;
    patient.email = req.body.email || patient.email;
    patient.date = req.body.date || patient.date;
    patient.symptoms = req.body.symptoms || patient.symptoms;

    try {
        const patientUpdated = await patient.save();
        res.json(patientUpdated);
    } catch (error) {
        console.log(error);
    }
}

const deletePatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
        return res.status(404).json({msg: 'User not found'});
    }
    if (patient.veterinary.toString() !== req.veterinary._id.toString()) {
        return res.status(400).json({msg: 'Action not allowed'});
    }
    try {
        await patient.deleteOne();
        res.json({msg: 'Patient deleted'});
    } catch (error) {
        console.log(error);
    }
}


export {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
}