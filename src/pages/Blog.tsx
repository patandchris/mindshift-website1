import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Blog is not yet active. Redirect visitors to the homepage.
// Remove this redirect when real blog content is ready.
const Blog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default Blog;
