import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Form.module.css";

export default function Form() {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  const [remainingChars, setRemainingChars] = useState(500);

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

    axios
      .post("http://localhost:5165/api/message/add", formData)
      .then((response) => {
        console.log(response.data);
        setName("");
        setCountry("");
        setGender("");
        setMessage("");
        setRemainingChars(500);
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);
      });
  };

  const handleMessageChange = (event) => {
    const text = event.target.value;
    setMessage(text);
    setRemainingChars(500 - text.length);
  };

  return (
    <form
      className={`${classes.formContainer} container w-75`}
      onSubmit={handleSubmit}
    >
      <div className={`d-flex ${classes.inputGroup}`}>
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
            onChange={(e) => setName(e.target.value)}
          />
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
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
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
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
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
            value="Female"
            checked={gender === "Female"}
            onChange={() => setGender("Female")}
          />
          <label className={classes.radioButton__label} htmlFor="radio2">
            <span className={classes.radioButton__custom}></span>
            FEMALE
          </label>
        </div>
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
  );
}
