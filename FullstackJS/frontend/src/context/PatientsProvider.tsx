import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";
import useAuth from '../hooks/useAuth';

const PatientsContext = createContext();

export const PatientsProvider = ({children}) => {

    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState({})

    const {auth} = useAuth()

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.get('/patients', config);
                setPatients(data)
            } catch (error) {
                console.log(error)
            }
        };
        getPatients();
    }, [auth])

    const savePatient = async (patient) => {
        const token = localStorage.getItem('token'); 
        if (!token) return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if (patient.id) {
            try {
                const {data} = await clientAxios.put(`/patients/${patient.id}`, patient, config);
                const patientsUpdated = patients.map(p => 
                    (p._id === data._id ? data : p)    
                );
                setPatients(patientsUpdated);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {   
                const {data} = await clientAxios.post('/patients', patient, config);
                const {createdAt, updatedAt, __v, ...patientSaved} = data;
                setPatients([patientSaved, ...patients])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        
    }

    const editPatient = async (patient) => {
        setPatient(patient);
    }

    const deletePatient = async (id) => {
        const confirmation = confirm("¿Confirmas que deseas eliminar al paciente?");
        if (confirmation) {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clientAxios.delete(`/patients/${id}`, config);
                const patientsUpdated = patients.filter(p => p._id!==id);
                setPatients(patientsUpdated);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    return (
        <PatientsContext.Provider
            value={
                {
                    patients,
                    savePatient,
                    editPatient,
                    patient,
                    deletePatient
                }
            }
        >
            {children}
        </PatientsContext.Provider>
    )

}

export default PatientsContext;