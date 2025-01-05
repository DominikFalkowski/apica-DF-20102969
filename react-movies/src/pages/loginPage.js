import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
    const { authenticate, isAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use navigate for routing

    const handleLogin = async () => {
        await authenticate(username, password);
    };

    if (isAuthenticated) {
        return <Navigate to="/movies/favorites" />;
    }

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            <p>
                Don't have an account?{" "}
                <button
                    onClick={() => {
                        console.log("Navigating to /signup"); // Debugging
                        navigate('/signup');
                    }}
                >
                    Register
                </button>
            </p>
        </div>
    );
};

export default LoginPage;
