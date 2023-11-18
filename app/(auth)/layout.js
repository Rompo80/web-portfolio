import classes from "@styles/login.module.css";
import Dashboard from "@components/Dashboard";


export default function AuthLayout({ children }) {
  return (
  <section className={classes.proof_section}>
  <Dashboard classes={classes}/> 
  {children}
  </section>
  );
}