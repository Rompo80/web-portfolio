"use client";

import Image from "next/image";
import classes from "@styles/about.module.css";
import Link from "next/link";


const About = () => {

  return (

      <section className={classes.wrapper}>
        <aside className={classes.image}>
          <Image
            src="/assets/img/me/IMG-1285-NEW.jpg"
            alt="Roman Potachenski Photographer"
            width={250}
            height={250}
          />
        </aside>

        <article className={classes.content_about}>
          <h2>Bonjour, Hello</h2>
           <p>
            We all experience small things in life that makes us happy. The
            photography is one of those things, and much more. It's amazing to
            cupture true emotions and sublim gestures. Everyday like this makes
            me extremenly happy and look foreward for a new photo adventure
          </p>
        <Link href="/contact">Contact me</Link>
        </article>
      </section>

  );
};

export default About;
