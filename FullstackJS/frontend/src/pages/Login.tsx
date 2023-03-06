import {Link} from 'react-router-dom'

export const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia sesión y Administra tus {""} 
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input 
              type="email"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input 
              type="password"
              placeholder="Password de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <input 
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-around">
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/register">¿No tienes cuenta? Regístrate</Link>
          <Link 
            className="block text-center my-5 text-gray-500"
            to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </nav>
      </div>      
    </>
  )
}

export default Login;