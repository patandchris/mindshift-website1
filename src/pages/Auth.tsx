import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// /auth is no longer used. All authentication is handled by WeekOneAccess.
// Redirect any visitor landing here to the correct auth page.
const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/week-one-access", { replace: true });
  }, [navigate]);

  return null;
};

export default Auth;
