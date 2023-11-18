
"use client";
import React from 'react';
import classes from "@styles/login.module.css";
import { useSession } from 'next-auth/react';
import Dashboard from '@components/Dashboard';


const ProtectedLayout = ({ children }) => {
    const { data: session, status } = useSession();
 

    if (status === 'loading') {
        return <div>Loading...</div>;
      }


    return (
      <>
      <Dashboard classes={classes}/>
      {!session || session.user?.email !== "kik@gmail.com" ?<div>
          This is protected and you do not have access to it.
        </div> : <>{children}</>}
        
      </>
    );
};

export default ProtectedLayout;
