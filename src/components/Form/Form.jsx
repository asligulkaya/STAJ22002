import { useEffect, useState } from "react";
import { validateForm } from "../../helpers/validation";
import axios from "axios";
import classes from "./Form.module.css";
import Snackbar from "../Snackbar/Snackbar";

export default function Form() {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const [remainingChars, setRemainingChars] = useState(500);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5165/api/countries")
      .then((response) => {
        setCountries(response.data.data.countries);
      })
      .catch((error) => {
        console.error("There was an error fetching the countries!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      country,
      gender,
      message,
    };

    const validationErrors = validateForm(formData, [
      "name",
      "country",
      "gender",
      "message",
    ]);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post("http://localhost:5165/api/message/add", formData)
      .then((response) => {
        console.log(response.data);
        setName("");
        setCountry("");
        setGender("");
        setMessage("");
        setRemainingChars(500);
        setErrors({});

        setSnackbarMessage("Form submitted successfully!");
        setIsSnackbarVisible(true);

        setTimeout(() => {
          setIsSnackbarVisible(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);

        setSnackbarMessage("Error sending the message");
        setIsSnackbarVisible(true);

        setTimeout(() => {
          setIsSnackbarVisible(false);
        }, 3000);
      });
  };

  const handleChange = (setter, field) => (event) => {
    setter(event.target.value);
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleMessageChange = (event) => {
    const text = event.target.value;
    setMessage(text);
    setRemainingChars(500 - text.length);
    if (errors.message) {
      setErrors((prevErrors) => ({ ...prevErrors, message: null }));
    }
  };

  return (
    <>
      <form
        className={`${classes.formContainer} container w-75`}
        onSubmit={handleSubmit}
      >
        <div className={`d-flex justify-content-center ${classes.inputGroup}`}>
          {/* Name Input */}
          <div
            className={`${classes.formInputs} col-6 justify-content-center d-flex align-items-center my-3 p-3`}
          >
            <label htmlFor="name" className={`${classes.formLabels} m-3`}>
              Name:
            </label>
            <input
              className={`${classes.nameInput} form-control`}
              type="text"
              placeholder="Name"
              maxLength="50"
              value={name}
              onChange={handleChange(setName, "name")}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>
          {/* Country Input */}
          <div
            className={`${classes.formInputs} col-6 justify-content-center d-flex align-items-center my-3 p-3`}
          >
            <label htmlFor="country" className={`${classes.formLabels} m-3`}>
              Country:
            </label>
            <select
              id="inputState"
              className={`${classes.optionGroup} form-control`}
              value={country}
              onChange={handleChange(setCountry, "country")}
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <small className="text-danger">{errors.country}</small>
            )}
          </div>
        </div>
        {/* Gender Input */}
        <div
          className={`${classes.radioButtonContainer} justify-content-center my-3`}
        >
          <div className={classes.radioButton}>
            <input
              type="radio"
              className={classes.radioButton__input}
              id="radio1"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={handleChange(setGender, "gender")}
            />
            <label className={classes.radioButton__label} htmlFor="radio1">
              <span className={classes.radioButton__custom}></span>
              MALE
            </label>
          </div>
          <div className={classes.radioButton}>
            <input
              type="radio"
              className={classes.radioButton__input}
              id="radio2"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={handleChange(setGender, "gender")}
            />
            <label className={classes.radioButton__label} htmlFor="radio2">
              <span className={classes.radioButton__custom}></span>
              FEMALE
            </label>
          </div>
          {errors.gender && (
            <small className="text-danger">{errors.gender}</small>
          )}
        </div>
        {/* Message Text Area */}
        <div className={classes.messageBox}>
          <textarea
            required=""
            placeholder="Message..."
            className={classes.messageInput}
            rows="3"
            maxLength="500"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
          {errors.message && (
            <small className="text-danger">{errors.message}</small>
          )}

          <button className={classes.sendButton} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 664 663"
            >
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="33.67"
                stroke="#6c6c6c"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
            </svg>
          </button>
        </div>
        <small className={classes.remainingText}>
          Remaining Characters: {remainingChars}
        </small>
      </form>
      <Snackbar message={snackbarMessage} isVisible={isSnackbarVisible} />
    </>
  );
}
