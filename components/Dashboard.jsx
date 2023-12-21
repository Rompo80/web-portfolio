"use client";
import Link from "next/link";
// import { useSession } from "next-auth/react";



const Dashboard = ({ classes, pathname, session }) => {
  
  const pathClients = pathname.startsWith("/clients");
  console.log(pathname);
  
  return (
    <section className={pathClients ? classes.dashboard :classes.header_container}>
      {!pathClients ? <img
        src="/assets/img/wedding_gallery/wedding-3.webp"
        alt="header image"
      /> : ""}
      <aside>
        
        {session ? (
          <>

            <p>{session.user.email}</p>
            
            <Link href="/signout">Sign Out</Link>
          </>
        ) : (<>
          <p>Not signed in</p>
          <Link href="/signup">Sign Up</Link>
          </>
        )}
      </aside>
    </section>
  );
};
export default Dashboard;
