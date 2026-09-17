import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";



interface ProtectedRouteProps {
    allowedRole: "admin" | "staff";
}



const ProtectedRoute = ({allowedRole}: ProtectedRouteProps) => {

    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);


    useEffect(() => {

        const checkSession = async () => {
            try {
                const response = await fetch(
                    "http://localhost/ncaa/login/session.php",
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (data.success) {
                    setRole(data.user.role);
                } else {
                    setRole(null);
                }
            } catch (error) {
                console.log(error);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);


    if (loading) {
       return <div>loading...</div>
    }

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (role !== allowedRole) {
        return <Navigate to={`/${role}/dahsboard`} replace />;
    }

    return <Outlet />
}

export default ProtectedRoute;