import classDash from "@components/dashboard.module.css";
import Link from "next/link";



const Dashboard = ({ classes, session, status, pathname }) => {

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_USER;
  const clientEmail = session?.user.email;


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
            {pathname !== "/signin" ? (<Link className={classDash.signin} href="/signin">
              Sign In
            </Link>): (<Link className={classDash.signin} href="/proofing">
              Back
            </Link>)}
          </>
        )}
      </aside>
    </section>
  );
};
export default Dashboard;
