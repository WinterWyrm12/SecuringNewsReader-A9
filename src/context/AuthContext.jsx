import { createContext, useContext, useState } from "react";

// context creation
const AuthContext = createContext(null);

// custom hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be within AuhtProvider');
    }
    return context;
}

// AuthProvider
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    // authenitication check
    const isAuthenticated = user != null;

    // login function
    const login = (username, password, role = 'regular') => {
        // jwt token - simulation
        const mockToken = `mock_jwt_token_${Date.now()}`;

        // user object
        const userData = {
            username: username,
            role: role,
            token: mockToken
        };

        // store in state
        setUser(userData);

        // simulating real app pratcice of storing in localStorage
        localStorage.setItem('authToken', mockToken);

        return userData;
    };

    // logout functionality
    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    };

    // check for specific role frol user
    const hasRole = (role) => {
        return user?.role === role;
    };

    // context value available to all children
    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        hasRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}