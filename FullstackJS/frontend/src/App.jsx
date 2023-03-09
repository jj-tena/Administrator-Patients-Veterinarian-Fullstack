import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'
import { Login } from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPasword'
import ConfirmAccount from './pages/ConfirmAccount'
import NewPassword from './pages/NewPassword'
import { AuthProvider } from './context/AuthProvider'
import { PatientsProvider } from './context/PatientsProvider'
import ProtectedRoute from './layout/ProtectedRoute'
import AdminPatients from './pages/AdminPatients';
import { EditProfile } from './pages/EditProfile';
import { ChangePassword } from './pages/ChangePassword';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<AdminPatients />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
