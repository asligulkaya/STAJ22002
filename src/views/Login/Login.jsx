import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginSVG from "../../assets/svg/login.svg";
import classes from "./Login.module.css";
import { login } from "../../utils/auth";
import { validateLogin } from "../../helpers/validation";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateLogin(credentials);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await login(credentials);
      console.log(response);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  }

  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <div className={classes.container}>
        <div className={classes.left}>
          <form className={classes.form} onSubmit={handleSubmit} method="post">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className={classes.inputBlock}>
              <input
                className={`${classes.inputs}`}
                type="text"
                name="username"
                required
                value={credentials.username}
                onChange={handleChange}
              />
              <label htmlFor="username" className={classes.labels}>
                Username
              </label>
              {errors.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>
            <div className={classes.inputBlock}>
              <input
                className={classes.inputs}
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
              />
              <label htmlFor="pass" className={classes.labels}>
                Password
              </label>
              {errors.password && (
                <small id="passwordError" className="text-danger">
                  {errors.password}
                </small>
              )}
            </div>
            <div className={classes.inputBlock}>
              <span className={classes.forgot}>
                <a href="#">Forgot Password?</a>
              </span>
              <button className={classes.button}>Submit</button>
            </div>
          </form>
        </div>
        <div className={classes.right}>
          <div className={classes.img}>
            <img src={loginSVG} alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}
