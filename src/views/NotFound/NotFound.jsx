import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go to Homepage</Link>
  </div>
);

export default NotFound;
