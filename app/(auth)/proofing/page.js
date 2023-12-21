"use client";
import React, { useState, useEffect } from "react";
import classes from "@styles/login.module.css";
import classProofing from "@styles/proofing.module.css";
import SignInForm from "@components/SignIn_test";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Proofing = () => {
  const { data: session } = useSession();
  const [photoSession, setPhotoSession] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/proofing");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setPhotoSession(data);
    } catch (error) {
      console.error("Error fetching photo sessions:", error);
    }
  };

  return (
    <div className={classProofing.main_container}>
      {session ? (
        <section className={classProofing.flex_container}>
          {photoSession.map((file) => (
            <Link key={file.id} href={`/clients/${file.title}`}>
              <div className={classProofing.flex_card}>
                <img
                  src={file.image[0]?.img_path}
                  alt={`session_${file.title}`}
                />
                <p>{file.title}</p>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <SignInForm classes={classes} />
      )}
    </div>
  );
};

export default Proofing;
