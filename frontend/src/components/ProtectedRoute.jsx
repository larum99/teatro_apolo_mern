'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isLoggedIn, role } = useAuth();
    const router = useRouter();

    if (!isLoggedIn) {
        router.push('/login'); // Redirigir a login si no está autenticado
        return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        router.push('/403'); // Redirigir si el rol no está permitido
        return null;
    }

    return children;
};

export default ProtectedRoute;
