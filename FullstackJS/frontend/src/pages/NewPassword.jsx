import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";
import { Link } from "react-router-dom";

const NewPassword = () => {

    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);
    const [passwordModified, setPasswordModified] = useState(false);

    const {token} = useParams();

    useEffect(() => {
        const checkToken = async () => {
            try {
                await clientAxios(`/veterinaries/forgot-password/${token}`)
                setAlert({
                    msg:  'Introduce tu nuevo password',
                    error: false
                })
                setValidToken(true);
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        };
        checkToken();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length<6) {
            setAlert({
                msg: 'El password debe tener más de 6 caracteres',
                error: true
            })
        }
        try {
            const url = `/veterinaries/forgot-password/${token}`;
            const {data} = await clientAxios.post(url, {password});
            console.log(data)
            setAlert({
                msg:  data.msg,
                error: false
            })
            setPasswordModified(true)
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
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

          {validToken && ( 
            <form
                onSubmit={handleSubmit}
                >
                <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nuevo password
                    </label>
                    <input 
                        type="password"
                        placeholder="Tu nuevo password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                    />
                    </div>
                <input 
                    type="submit"
                    value="Restablecer password"
                    className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
                />
            </form>
          )}

          {passwordModified && (
            <nav className="mt-10 lg:flex lg:justify-around">
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/register">¿No tienes cuenta? Regístrate</Link>
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/">¿Ya tienes cuenta? Inicia sesión</Link>
            </nav>
          )}
          
      </div>      
    </>
  )
}

export default NewPassword;