import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost/ncaa/login/session.php", {
            credentials: "include",
        })
         .then((res) => res.json())
         .then((data) => {
             if (!data.success) {
                navigate("/login", { replace: true });
                return;
             }

             if (data.user.role === "admin") {
                navigate("/admin/dashboard", { replace: true });
             } else {
                navigate("/staff/dashboard", { replace: true });
             }
         });
    }, []);

    return <p>Loading...</p>;

}

export default Home;