import classes from "./FormPage.module.css";

import Form from "../components/Form/Form";

export default function FormPage() {
  return (
    <div className={`${classes.formGroup} container`}>
      <h1>Enter your message please</h1>
      <Form />
    </div>
  );
}
