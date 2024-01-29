'use client'
import classes from "@styles/login.module.css";
import Dashboard from "@components/Dashboard";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function AuthLayout({ children }) {
 const { data: session, status } = useSession();
 const pathname = usePathname();
  return (
  <>
  <Dashboard pathname={pathname} session={session} status={status}/> 
  {children}
  </>

  );
}