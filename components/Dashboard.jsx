import classDash from "@components/dashboard.module.css";
import Link from "next/link";



const Dashboard = ({ session, status, pathname }) => {

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_USER;
  const clientEmail = session?.user.email;


  return (
    <section className={classDash.dash_container}>

      <aside>
        {session || status === "authenticated" ? (
          <header>
            <p className={classDash.dash_email}>{clientEmail}</p>
            <Link href="/signout">Sign Out</Link>
            {clientEmail === adminEmail && (
              <Link href="/signup">Sign Up</Link>
            )}
          </header>
        ) : (
          <header>
            {pathname !== "/signin" ? (<Link className={classDash.dash_btn} href="/signin">
              Sign In
            </Link>): (<Link className={classDash.dash_btn} href="/proofing">
              Back
            </Link>)}
          </header>
        )}
        
      </aside> 
            <h2>
              Gallery 
            </h2>    
    </section>
  );
};
export default Dashboard;
