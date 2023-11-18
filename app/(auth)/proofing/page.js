"use client";
import classes from "@styles/login.module.css";
import classProofing from "@styles/proofing.module.css";
import SignInForm from "@components/SignIn_test";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Proofing = () => {
  const { data: session } = useSession();

  return (
    <div className={classProofing.main_container}>
      {session ? (
        <section className={classProofing.flex_container}>
          <Link href="/clients/Gahbi+Nik">
            <div className={classProofing.flex_card}>
              <img
                src="/assets/img/family/family-1.webp"
                alt="session_Gahbi-Nik"
              />
            </div>
          </Link>
        </section>
      ) : (
        <SignInForm classes={classes} />
      )}
    </div>
  );
};

export default Proofing;
