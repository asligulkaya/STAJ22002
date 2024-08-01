import classes from "./FormPage.module.css";

import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";

export default function FormPage() {
  return (
    <div>
      <Header />
      <div className={`${classes.formGroup} container`}>
        <h1 className={classes.messageHeader}>Enter your message please</h1>
        <Form />
      </div>
    </div>
  );
}
