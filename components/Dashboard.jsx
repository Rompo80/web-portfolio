'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";

const Dashboard = ({ classes }) => {
  const { data: session } = useSession();

  return (
    
    <aside className={classes.aside_container}>
    <Link href="/signup">Sign Up</Link>
    {session ? (
        <>
          <p>Signed in as: {session.user.email}</p>
          <Link href="/signout">Sign Out</Link>
        </>
      ) : (
        <p>Not signed in</p>
      )}
 </aside>
  );
};
export default Dashboard;