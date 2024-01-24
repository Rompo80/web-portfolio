import classDash from "@components/dashboard.module.css";
import Link from "next/link";


const Dashboard = ({ classes, session, status }) => {

  const adminEmail = process.env.ADMIN_USER;
  const clientEmail = session?.user.email;
  
   console.log(adminEmail);
  return (
    <section className={classes.header_container}>

      <aside>
        {session || status === "authenticated" ? (
          <>
            <span>
              Gallery <strong>{clientEmail}!</strong>
            </span>
            <Link href="/signout">Sign Out</Link>
            {clientEmail === adminEmail && (
              <Link href="/signup">Sign Up</Link>
            )}
          </>
        ) : (
          <>
            <Link className={classDash.signin} href="/signin">
              Sign In
            </Link>
          </>
        )}
      </aside>
    </section>
  );
};
export default Dashboard;
