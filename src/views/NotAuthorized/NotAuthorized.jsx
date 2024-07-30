import { Link } from "react-router-dom";

const NotAuthorized = () => (
  <div>
    <h1>403 - Not Authorized</h1>
    <p>You do not have permission to view this page.</p>
    <Link to="/">Go to Homepage</Link>
  </div>
);

export default NotAuthorized;
