import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user } = useSelector((state) => state.auth);

    if (user === undefined) return <div>Loading...</div>;

    if (!user || user.role !== 'recruiter') return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
