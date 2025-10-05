"use client";

import { createContext, useState, ReactNode, useContext, useEffect } from "react";

type UserRegister = {
    name: string;
    email: string;
    password: string;
};

type UserLogin = {
    email: string;
    password: string;
};

type AuthContextType = {
    token: string | null;
    loading: boolean;
    login: (userData: UserLogin) => Promise<void>;
    register: (userData: UserRegister) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Carrega token do localStorage no client
    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) setToken(t);
        setLoading(false);
    }, []);

    const login = async (userData: UserLogin) => {
        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const data = await res.json();

            if (!res.ok || !data.sucess) {
                throw new Error(data.error || "Erro ao fazer login");
            }

            setToken(data.token);
            localStorage.setItem("token", data.token);
        } catch (err) {
            throw err;
        }
    };

    const register = async (userData: UserRegister) => {
        try {
            const res = await fetch("http://localhost:8080/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const data = await res.json();

            if (!res.ok || !data.sucess) {
                throw new Error(data.error || "Erro ao registrar usuário");
            }

            setToken(data.token);
            localStorage.setItem("token", data.token);
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook customizado
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}
