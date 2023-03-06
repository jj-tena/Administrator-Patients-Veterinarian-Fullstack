import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'
import { Login } from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPasword'
import ConfirmAccount from './pages/ConfirmAccount'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="confirm-account" element={<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
