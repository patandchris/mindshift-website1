import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// PWA is not yet built. Redirect visitors to the homepage.
// Remove this redirect when the app is ready.
const MindshiftApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default MindshiftApp;
