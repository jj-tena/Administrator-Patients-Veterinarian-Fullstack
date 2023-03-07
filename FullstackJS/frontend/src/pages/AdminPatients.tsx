import { useState } from "react";
import Form from "../components/Form";
import PatientsList from "../components/PatientsList";

const AdminPatients = () => {

  const [revealForm, setRevealForm] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold
        uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={() => setRevealForm(!revealForm)}
      >
        {revealForm ? 'Ocultar formulario' : 'Mostrar formulario'}
      </button>
      <div className={`${revealForm ? 'block' : 'hidden' } md:block md:w-1/2 md:w-2/5`}>
        <Form/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <PatientsList/>
      </div>
    </div>
  )
}

export default AdminPatients;