"use client";
import classes from "@styles/login.module.css";
// import AlertBox from "./AlertBox";
import { signIn, getCsrfToken } from 'next-auth/react';
import React, { useState } from "react";


const AuthForm = () => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [loginDisabled, setLoginDisabled] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [showAlertBox, setShowAlertBox] = useState(false);
  
    const styles = {
      disabled: {
        pointerEvents: "none",
        color: "#e98924",
      },
    };
  
    const maxAttempts = 3;
    const pswRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&?]).{8,}$/;
  
    const validation = () => {
      if (username === "" || username.length <= 2 || !pswRegex.test(password)) {
        setShowAlertBox(true);
        setTimeout(() => {
          setShowAlertBox(false);
        }, 3000);
  
        return false;
      }
      setShowAlertBox(false);
      return true;
    };
  
    const handleSignIn = () => {
      if (validation()) {
        setLoginAttempts(0);
        signin();
      } else {
        setLoginAttempts(loginAttempts + 1);
        if (loginAttempts >= maxAttempts) {
          setLoginDisabled(true);
          setShowAlertBox(true);
        }
      }
    };
  
    // Determine if the "Sign In" button should be disabled
    const isSignInDisabled = !username || !password || loginDisabled;
  
    return (
      <section className={classes.login_container}>
        <header className={classes.header}>
          <h2>Client Sign In</h2>
        </header>
  
        <form type="submit" className={classes.login_form} action="">
          <label htmlFor="uname">Username</label>
          <input
            type="text"
            id="uname"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loginDisabled}
            required={username}
          />
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            name="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginDisabled}
            required={password}
          />
          <button
            onClick={handleSignIn}
            disabled={isSignInDisabled}
            style={isSignInDisabled ? styles.disabled : {}}
          >Sign In
          </button>

        </form>
      </section>
    );
  };
  
  export default AuthForm;