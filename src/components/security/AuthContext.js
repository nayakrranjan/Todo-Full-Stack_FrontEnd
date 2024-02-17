import { createContext, useContext, useState } from "react"
import { executeAuthentication } from "../api/TodoApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = function({children}) {
    const [isAuthenticated, setAuthentication] = useState(false);
    const [username, setUserName] = useState(null);
    const [token, setToken] = useState(null);

    const logout = function() {
        setAuthentication(false);
        setUserName(null);
        setToken(null);
    }
    async function login(username, password) {

        const authToken = 'Basic ' + window.btoa(username + ':' + password);

        try {
            const response = await executeAuthentication(authToken)
            
            if (response.status == 200) {
                setAuthentication(true);
                setUserName(username);
                setToken(authToken);

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = authToken;
                        return config;
                    }
                )
                return true;
            }
            else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
    }
        
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;