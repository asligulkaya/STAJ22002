import { Link } from "react-router-dom";
import classes from "../Error.module.css";
import notAuthorized from "../../../assets/notAuthorized.png";

const NotAuthorized = () => (
  <div className="d-flex align-items-center" style={{ height: "90vh" }}>
    <section className="w-100 w-md-50 d-flex flex-column align-items-center justify-content-center">
      <h1 className={classes.header400s}>403</h1>
      <h2>Not Authorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to Homepage</Link>
    </section>
    <section className="w-100 w-md-50 d-none d-md-block">
      <img src={notAuthorized} alt="not found" style={{ width: "600px" }} />
    </section>
  </div>
);

export default NotAuthorized;
