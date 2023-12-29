"use client";
import Link from "next/link";

const Dashboard = ({ classes, pathname, session, status }) => {
  const pathClients = pathname.startsWith("/clients");
  console.log(pathname);
  console.log(status);
  return (
    <section
      className={pathClients ? classes.dashboard : classes.header_container}
    >
      {!pathClients ? (
        <img
          src="/assets/img/weddings/wedding-3.webp"
          alt="header image"
        />
      ) : (
        ""
      )}
      <aside>
        {session || status === "authenticated" ? (
          <>
            <span>Welcome {session?.user.email}!</span>
            <Link href="/signout">Sign Out</Link>
          </>
        ) : (
          <>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </aside>
    </section>
  );
};
export default Dashboard;
