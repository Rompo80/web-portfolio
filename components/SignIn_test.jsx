"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = ({ classes }) => {
  const router = useRouter();

  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    disabled: {
      pointerEvents: "none",
      color: "#e98924",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Signing in...");

    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
        setMessage("Invalid credentials");
        setIsLoading(false);
      } else {
        setMessage("");
        // router.refresh();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(router);
    if (status === "authenticated") {
      router.refresh();
      router.push("/proofing");
    }
  }, [status]);

  const isSignInDisabled = email === "" || password === "";

  return (
    <section className={classes.login_container}>
      <header className={classes.header}>
        <h2>Client Sign In</h2>
      </header>
      <div role="form" className={classes.login_form}>
        <input
          type="text"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter code"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={isSignInDisabled}
          style={isSignInDisabled ? styles.disabled : {}}
        >
          Sign in
        </button>

        <p>{message}</p>
        {isLoading && <div className={classes.loader}></div>}
      </div>
    </section>
  );
};

export default SignInForm;
