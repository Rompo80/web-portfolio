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
      border: "1px solid var(--border-color)",
      background: "none",
      color: "var(--placeholder-color)"
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
   

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
          {isLoading ? (<div className={classes.loader_box}><div className={classes.loader}></div><span>Signing in...</span></div>)  : "Sign in" }
        </button>

        <p>{message}</p>
        
      </div>
    </section>
  );
};

export default SignInForm;
