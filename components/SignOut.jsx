"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";


const SignOut = () => {

  useEffect(() => {
    const handleSignOut = async () => {
      
      try {
        console.log("Initiating sign-out...");
        // await signOut({ redirect: false });
        await signOut({
          callbackUrl: '/proofing',
          redirect: true,
      });
        console.log("Sign-out successful!");

      } catch (error) {
        console.error("Error during sign out:", error);
      }
    };

    handleSignOut();
  }, []);


 return null;
};

export default SignOut;
