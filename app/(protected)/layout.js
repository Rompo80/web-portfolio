"use client";
import React from "react";
import classes from "@styles/login.module.css";
import { useSession } from "next-auth/react";
import Dashboard from "@components/Dashboard";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const { data: session, status } = useSession();
  
 
  const userName = decodeURIComponent(params.uImages[0])
  const userPath = "/"+userName+"/"+params.uImages[1]+"/"+params.uImages[2]


  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dashboard classes={classes} pathname={userPath} session={session} />
      {!session || userPath !== pathname.replace("/clients", "") ? (
        <div>This is protected and you do not have access to it.</div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ProtectedLayout;