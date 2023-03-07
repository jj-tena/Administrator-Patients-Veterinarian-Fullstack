import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [starting, setStarting] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setStarting(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clientAxios('/veterinaries/profile', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
            setStarting(false);

        }
        authUser();
    }, [])

    const logOut = () => {
        localStorage.removeItem('token');
        setAuth({})
    };

    return (
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    starting,
                    logOut
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;