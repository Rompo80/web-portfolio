"use client";
import React, { useState, useEffect } from "react";
import signUp from "@app/actions/users/signUp";

const SignUpForm = ({ classes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [privileges, setPrivileges] = useState([]);
  const [selectedPrivilege, setPrivilege] = useState("");

  const styles = {
    disabled: {
      pointerEvents: "none",
      border: "1px solid var(--border-color)",
      background: "none",
      color: "var(--placeholder-color)"
    },
  };

  useEffect(() => {
    // Fetch privileges from the server when the component mounts
    fetchPrivileges();
  }, []);

  const fetchPrivileges = async () => {
    try {
      const response = await fetch("/api/signup");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setPrivileges(data);
    } catch (error) {
      console.error("Error fetching privileges:", error);
    }
  };

  const handleSubmit = async () => {
    setMessage("Signing up...");
    const privilegeId = parseInt(selectedPrivilege, 10);
    const result = await signUp(name, email, password, privilegeId);
    setMessage(result);
  };

  const isSignInDisabled =
    email === "" || password === "" || name === "" || selectedPrivilege === "";

  return (
    <section className={classes.login_container}>
      <header className={classes.header}>
        <h2>Client Sign Up</h2>
      </header>
      <div role="form" className={classes.login_form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={selectedPrivilege}
          onChange={(e) => setPrivilege(e.target.value)}
        >
          <option value="">Select Privilege</option>
          {privileges.map((privilege) => (
            <option key={privilege.id} value={privilege.id}>
              {privilege.privilege}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          disabled={isSignInDisabled}
          style={isSignInDisabled ? styles.disabled : {}}
        >
          Sign up
        </button>

        <p>{message}</p>
      </div>
    </section>
  );
};

export default SignUpForm;
