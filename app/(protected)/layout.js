"use client";
import React from "react";
import classes from "@styles/login.module.css";
import { useSession } from "next-auth/react";
import Dashboard from "@components/Dashboard";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const params = useParams();

  const { data: session, status } = useSession();
    
  const userNameString = decodeURIComponent(params.uImages[0]);
  const userName = userNameString.split(" ").join("");

  const sessionUser = session?.user.name.split(" ").join("");

  // console.log(sessionUser);

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/signin");
    }

  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }


  return (
    <section>
      <Dashboard classes={classes} session={session}/>
      {!session || userName !== sessionUser ? (
        <div>This page is protected and you do not have access to it.</div>
      ) : (
        <aside>{children}</aside>
      )}
    </section>
  );
};

export default ProtectedLayout;