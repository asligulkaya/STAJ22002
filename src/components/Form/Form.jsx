import classes from "./Form.module.css";

export default function Form() {
  return (
    <div className={`${classes.formContainer} container w-75`}>
      <div className={`d-flex justify-content-center ${classes.inputGroup}`}>
        {/* Name Input */}
        <div className="col-12 col-md-9 justify-content-center d-flex align-items-center my-3 p-3">
          <label htmlFor="name" className="m-3">
            Name:
          </label>
          <input className="form-control w-75" type="text" placeholder="Name" />
        </div>
        {/* Country Input */}
        <div className="col-12 col-md-9 justify-content-center d-flex align-items-center my-3 p-3">
          <label htmlFor="country" className="m-3">
            Country:
          </label>
          <select
            id="inputState"
            className={`${classes.optionGroup} form-control w-75`}
          >
            <option selected>Choose...</option>
            <option>...</option>
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
            name="radio-group"
          />
          <label className={classes.radioButton__label} htmlFor="radio1">
            <span className={classes.radioButton__custom}></span>
            Man
          </label>
        </div>
        <div className={classes.radioButton}>
          <input
            type="radio"
            className={classes.radioButton__input}
            id="radio2"
            name="radio-group"
          />
          <label className={classes.radioButton__label} htmlFor="radio2">
            <span className={classes.radioButton__custom}></span>
            WOMAN
          </label>
        </div>
      </div>
      {/* Message Text Area */}
      <div className={classes.messageBox}>
        <div className={classes.fileUploadWrapper}>
          <label htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 337 337"
            >
              <circle
                strokeWidth="20"
                stroke="#6c6c6c"
                fill="none"
                r="158.5"
                cy="168.5"
                cx="168.5"
              ></circle>
              <path
                strokeLinecap="round"
                strokeWidth="25"
                stroke="#6c6c6c"
                d="M167.759 79V259"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="25"
                stroke="#6c6c6c"
                d="M79 167.138H259"
              ></path>
            </svg>
            <span className={classes.tooltip}>Add an image</span>
          </label>
          <input type="file" name="file" className={classes.file} />
        </div>
        <textarea
          required=""
          placeholder="Message..."
          className={classes.messageInput}
          rows="3"
        ></textarea>
        <button className={classes.sendButton}>
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
    </div>
  );
}
