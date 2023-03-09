import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import clientAxios from '../config/axios';
import Alert from '../components/Alert';

export const ConfirmAccount = () => {

  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams()
  const {token} = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/veterinaries/confirm/${token}`
        const {data} = await clientAxios(url);
        setConfirmedAccount(true);
        setAlert({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
      setLoading(false);
    }
    confirmAccount()
  }, [])



  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y Administra tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!loading && <Alert alert={alert}/>}
        {confirmedAccount && (
          <Link 
          className="block text-center my-5 text-gray-500"
          to="/">Iniciar sesión</Link>
        )}
      </div>      
    </>
    )
}

export default ConfirmAccount;
  