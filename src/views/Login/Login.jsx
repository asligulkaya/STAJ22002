import { useState } from "react";

import loginSVG from "../../assets/login.svg";
import classes from "./Login.module.css";

import { login } from "../../utils/auth";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    username: "",
    password: "",
  });

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({ ...prevValues, [identifier]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await login(enteredValues);
      console.log(response);
    } catch (error) {
      console.error("Login failed: ", error);
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
                id="email"
                required
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              <label htmlFor="email" className={classes.labels}>
                Username
              </label>
            </div>
            <div className={classes.inputBlock}>
              <input
                className={classes.inputs}
                type="password"
                id="pass"
                required
                onChange={(e) => handleInputChange("password", e.target.value)}
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
