import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginSVG from "../../assets/login.svg";
import classes from "./Login.module.css";

import { login } from "../../utils/auth";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await login(credentials);
      console.log(response);
      navigate("/");
    } catch (error) {
      setError(error.message);
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
            <div className={classes.inputBlock}>
              <input
                className={classes.inputs}
                type="text"
                name="username"
                value={credentials.username}
                required
                onChange={handleChange}
              />
              <label htmlFor="username" className={classes.labels}>
                Username
              </label>
            </div>
            <div className={classes.inputBlock}>
              <input
                className={classes.inputs}
                name="password"
                type="password"
                value={credentials.password}
                required
                onChange={handleChange}
              />
              <label htmlFor="pass" className={classes.labels}>
                Password
              </label>
            </div>
            <div className={classes.inputBlock}>
              <span className={classes.forgot}>
                <a href="#">Forgot Password?</a>
              </span>
              <button className={classes.button}>Submit</button>
            </div>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
