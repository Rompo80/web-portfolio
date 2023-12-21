"use client";
import React, { useState } from "react";
import classes from "@styles/contact.module.css";
import { sendContactForm } from "@lib/mailApi";

const initValues = { name: "", email: "", subject: "", message: "" };
const initState = { values: initValues };

export default function Contact() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const { values, isLoading, error } = state;

  

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onBlur = ({ target }) =>
    setTouched((prev) => ({
      ...prev,
      [target.name]: true,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
    } catch (error) {
      console.error("Error submitting form:", error);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  const btnDisabled = !values.name || !values.email || !values.subject;
  return (
    <section className={classes.container}>
      <form
        id="email_form"
        className={classes.form}
        method="POST"
        onSubmit={onSubmit}
      >
        {error && (
          <span style={{ color: "red", fontSize: "large" }}>{error}</span>
        )}
        {/* {emailStatus && (
          <span style={{ color: "green", fontSize: "large" }}>{emailStatus.message}</span>
        )} */}

        <label className={classes.label}>
          Name
          <input
            className={
              touched.name && !values.name
                ? `${classes.input} ${classes.isInvalid}`
                : classes.input
            }
            type="text"
            name="name"
            value={values.name}
            placeholder="name"
            onChange={handleChange}
            onBlur={onBlur}
          />
        </label>
        <label className={classes.label}>
          Email
          <input
            className={
              touched.email && !values.email
                ? `${classes.input} ${classes.isInvalid}`
                : classes.input
            }
            type="text"
            name="email"
            value={values.email}
            placeholder="email"
            onChange={handleChange}
            onBlur={onBlur}
          />
        </label>
        <label className={classes.label}>
          Subject
          <input
            className={
              touched.subject && !values.subject
                ? `${classes.input} ${classes.isInvalid}`
                : classes.input
            }
            type="text"
            name="subject"
            value={values.subject}
            placeholder="subject"
            onChange={handleChange}
            onBlur={onBlur}
          />
        </label>
        <label className={classes.label}>
          Message
          <textarea
            type="text"
            name="message"
            rows={4}
            className={
              touched.message && !values.message
                ? `${classes.input} ${classes.isInvalid}`
                : classes.input
            }
            value={values.message}
            placeholder="Type your message please"
            onChange={handleChange}
            onBlur={onBlur}
          ></textarea>
        </label>
        <button disabled={btnDisabled || isLoading} type="submit">
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <aside className={classes.aside}>
        <p>
          Your journey starts here. I would love to hear more about you and your
          photo request. Please take your time and send me as much information
          as possible about you and your future photo session. I will make sure
          to provide you with all you need for you photo shoot, including
          package pricing and preparation details. See you soon!
        </p>
      </aside>
    </section>
  );
}
