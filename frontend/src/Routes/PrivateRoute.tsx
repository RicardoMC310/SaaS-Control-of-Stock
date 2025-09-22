import useStorage from "@/utils/useStorage";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element
}

export default function PrivateRoute({children}: PrivateRouteProps) {
    const [token, _] = useStorage("token", {name: "", email: ""});

    if (token.name == "" || token.email == "") return <Navigate to="/login" />

    return children;
}