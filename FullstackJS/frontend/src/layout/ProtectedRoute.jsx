import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProtectedRoute = () => {

    const { auth, starting } = useAuth();

  if (starting) return 'Loading...';

  return (
    <>
        <Header/>
            {Object.keys(auth).length ? (
                <main className="container mx-auto mt-10">
                    <Outlet/>
                </main>
            ) : <Navigate to="/" />}
        <Footer/>
    </>
    
  )
}

export default ProtectedRoute;