import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
const LoginHeader = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  return (
      <header>
          {context.isAuthenticated ? (
              <p>
                  Welcome {context.userName}!{" "}
                  <button onClick={() => context.signout()}>Sign out</button>
              </p>
          ) : (
              <p>
                  You are not logged in{" "}
                  <button onClick={() => navigate('/login')}>Login</button>
              </p>
          )}
      </header>
  );
};

export default LoginHeader;