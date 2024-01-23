"use client";
import React, { useState, useEffect } from "react";
import classProof from "@styles/proofing.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Proofing = () => {
  const { data: session } = useSession(null);
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
    <div className={classProof.main_container}>
      <section className={classProof.flex_container}>
        {photoSession.map((file) => (
          <Link
            key={file.id}
            href={{
              pathname: !session ? `/signin` : `/clients/[uName]/[uId]/[sId]`,
            }}
            as={!session ? null : `/clients/${file.title}/${session?.user.id}/${file.id}`}
            shallow
          >
            <div className={classProof.flex_card}>
              <img
                src={file.image[0]?.img_path}
                alt={`session_${file.title}`}
              />
              <p
                className={
                  session?.user.name === file.title
                    ? classProof.underline
                    : ""
                }
              >
                {file.title}
              </p>
              <span className={classProof.img_type}>{file.image[0].category.type}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Proofing;
