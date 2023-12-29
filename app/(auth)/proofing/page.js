"use client";

import React, { useState, useEffect } from "react";
import classes from "@styles/login.module.css";
import classProofing from "@styles/proofing.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Proofing = () => {
  const { data: session, status } = useSession(null);
  const [photoSession, setPhotoSession] = useState([]);

  console.log(session);

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
      <section className={classProofing.flex_container}>
        {photoSession.map((file) => (
          <Link
            key={file.id}
            href={{
              pathname: session ? `/clients/[uName]/[uId]/[sId]` : `/signin`,
            }}
            as={`/clients/${file.title}/${session?.user.id}/${file.id}`}
            shallow
          >
            <div className={classProofing.flex_card}>
              <img
                src={file.image[0]?.img_path}
                alt={`session_${file.title}`}
              />
              <p
                className={
                  session?.user.name === file.title
                    ? classProofing.underline
                    : ""
                }
              >
                {file.title}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Proofing;
