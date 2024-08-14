import { Link } from "react-router-dom";
import classes from "../Error.module.css";
import notFound from "../../../assets/notFound.png";

const NotFound = () => (
  <div className="d-flex align-items-center" style={{ height: "90vh" }}>
    <section className="w-100 w-md-50 d-flex flex-column align-items-center justify-content-center">
      <h1 className={classes.header400s}>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Homepage</Link>
    </section>
    <section className="w-100 w-md-50 d-none d-md-block">
      <img src={notFound} alt="not found" style={{ width: "600px" }} />
    </section>
  </div>
);

export default NotFound;
