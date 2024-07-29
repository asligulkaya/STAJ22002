import loginSVG from "../../assets/login.svg";
import classes from "./Login.module.css";

export default function Login() {
  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <div className={classes.container}>
        <div className={classes.left}>
          <form className={classes.form}>
            <div className={classes.inputBlock}>
              <input
                className={classes.inputs}
                type="text"
                id="email"
                required
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
