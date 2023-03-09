import { useState } from 'react';
import {Link} from 'react-router-dom'
import Alert from '../components/Alert';
import clientAxios from '../config/axios';

export const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if(email === '') {
      setAlert({
        msg: 'El email es obligatorio',
        error: true
      });
      return;
    }
    try {
      const {data} = await clientAxios.post('/veterinaries/forgot-password', {email});
      console.log(data);
      setAlert({msg: data.msg, error: false})
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const {msg} = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu Password y Administra tus {""} 
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alert 
            alert={alert}          
          />}
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input 
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input 
            type="submit"
            value="Recuperar cuenta"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-around">
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/register">¿No tienes cuenta? Regístrate</Link>
          <Link 
              className="block text-center my-5 text-gray-500"
              to="/">¿Ya tienes cuenta? Inicia sesión</Link>
        </nav>
      </div>      
    </>
  )
}

export default ForgotPassword;
  