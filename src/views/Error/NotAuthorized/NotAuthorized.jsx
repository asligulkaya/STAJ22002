import { Link } from "react-router-dom";
import classes from "../Error.module.css";
import notAuthorized from "../../../assets/notAuthorized.png";

const NotAuthorized = () => (
  <div className="d-flex align-items-center" style={{ height: "90vh" }}>
    <section className="w-50">
      <h1 className={classes.header403}>403</h1>
      <h2>Not Authorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to Homepage</Link>
    </section>
    <section className="w-50">
      <img src={notAuthorized} alt="not found" style={{ width: "600px" }} />
    </section>
  </div>
);

export default NotAuthorized;
