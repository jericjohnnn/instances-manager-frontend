import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/auth/auth-config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const navigate = useNavigate();

  // Auto-redirect to dashboard after login
  useEffect(() => {
    if (activeAccount) {
      navigate('/instances');
    }
  }, [activeAccount, navigate]);

  const handleLoginRedirect = () => {
    instance.loginRedirect({
      ...loginRequest,
      redirectUri: "/",
    })
      .catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
    });
    window.location.reload();
  };
  return (
    <>
      <div>
        {activeAccount ? (
          <button onClick={handleLogoutRedirect}>Logout</button>
        ) : (
          <button onClick={handleLoginRedirect}>Login</button>
        )}
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <p>THIS IS A LOGO VITE</p>
        </a>
        <a href="https://react.dev" target="_blank">
          <p>THIS IS A LOGO REACT</p>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {activeAccount ? <p>You are logged in.</p> : <p>You need to login.</p>}
      </div>
    </>
  );
}
