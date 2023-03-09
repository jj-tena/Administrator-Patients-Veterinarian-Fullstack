import usePatients from "../hooks/usePatients";

export const Patient = ({patient}) => {

    const {editPatient, deletePatient} = usePatients();

    const {email, date, name, owner, symptoms, _id} = patient;

    const formatDate = (date) => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format();
    }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-800 my-2">
            Nombre: {' '}
            <span className="font-normal normal-case text-black">{name}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
            Propietario: {' '}
            <span className="font-normal normal-case text-black">{owner}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
            Email de contacto: {' '}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
            Fecha de alta: {' '}
            <span className="font-normal normal-case text-black">{formatDate(date)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">
            Síntomas: {' '}
            <span className="font-normal normal-case text-black">{symptoms}</span>
        </p>
        <div className="flex justify-around my-5">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase
                font-bold rounded-lg"
                onClick={() => editPatient(patient)}
            >
               Editar 
            </button>
            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase
                font-bold rounded-lg"
                onClick={() => deletePatient(_id)}
            >
               Eliminar 
            </button>
        </div>
    </div>
  )
}
