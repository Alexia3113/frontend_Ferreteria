import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest,usuariosRequest, deleteRequest } from "../api/auth";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth debe estar definido en un contexto');
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children}) =>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [errors, setErrors] = useState([]);
    const [loading,setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [usuarios, setUsuarios]=useState(null);

    const signup = async ( user ) =>{
        try {
            const res = await registerRequest(user);
            setIsAdmin(false);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            //console.log(error.response.data.message); 
            setErrors(error.response.data.message); 
            setIsAuthenticated(false);        
        }  
        setLoading(false);
    }//fin de signup

    const signin = async (user) =>{
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            setIsAdmin(res.data.isAdmin);
            //console.log(res);
        } catch (error) {
            //console.log(error) 
            setErrors(error.response.data.message);  
            setIsAuthenticated(false);       
        }
        setLoading(false);
    }//fin de signin

    //funcion para Cerrar sesión
    const logout = () =>{
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null)
        setIsAdmin(false);
    }

    const verUsuario = async()=>{
        try {
            const res = await usuariosRequest();
            setUsuarios(res.data)
        } catch (error) {
            //console.log(error.response.data.message); 
            setErrors(error.response.data.message); 
        }  
    }

    const deleteUsuario =async(id)=>{
        try {
            const res = await deleteRequest(id);
            console.log(res);
            if(res.status === 200)
                setUsuarios(usuarios.filter(user=>user._id !== id))
        } catch (error) {
            setErrors(error.response.data.message); 
        }
    }

    useEffect( ()=>{
        if(errors.length >0){
            const timer = setTimeout( ()=>{
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    },[errors]);

    useEffect( ()=>{
        async function checkLogin(){
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                setIsAdmin(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    setIsAdmin(false);
                    return setUser(null);
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setIsAdmin(res.data.isAdmin)
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null); 
                setIsAdmin(false);           
            }//fin de catch
            setLoading(false);
        }//fin de checklogin
        checkLogin();
    },[]) //fin de useEffect

    return(
        <AuthContext.Provider value={ {
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading,
            logout,
            isAdmin,
            verUsuario,
            usuarios,
            deleteUsuario
        } }>
            {children}
        </AuthContext.Provider>
    )
}//fin de AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.any
}