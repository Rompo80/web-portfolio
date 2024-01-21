"use client";
import classDash from "@components/dashboard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = ({ classes, session, status }) => {

  const [admin, setAdmin] = useState([]);


  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const user = await fetch("/api/user");
        if (!user.ok) {
          throw new Error(`Error: ${user.status} - ${user.statusText}`);
        }
        const data = await user.json();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching Admin:", error);
      }
    };

    getAuthUser();
  }, []);

  return (
    <section
      className={classes.header_container}
    >
      {/* {!pathClients ? (
        <img
          className={classDash.img_header}
          src="/assets/img/weddings/wedding-3.webp"
          alt="header image"
        />
      ) : (
        ""
      )} */}
      <aside>
        {session || status === "authenticated" ? (
          <>
            <span>Gallery <strong>{session?.user.email}!</strong></span>
            <Link href="/signout">Sign Out</Link>
            {session?.user.email === admin.email && (
              <Link href="/signup">Sign Up</Link>
            )}
          </>
        ) : (
          <>
            <Link className={classDash.signin} href="/signin">Sign In</Link>
          </>
        )}
      </aside>
    </section>
  );
};
export default Dashboard;
