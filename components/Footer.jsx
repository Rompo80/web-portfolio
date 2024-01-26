"use client";
import Link from "next/link";
import Image from "next/image";
import instIcon from '@public/assets/icons/insta-logo-2.svg';
import emailIcon from '@public/assets/icons/gmail-logo-2.svg';
import styles from "@components/footer.module.css";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social_media}>
        <div>
          <Link href="https://www.instagram.com/potachenski_photo/?hl=fr-ca">
            <Image
              src={instIcon}
              alt="roman potachenski - instagram link"
            />
          </Link>
        </div>

        <div>
          <Link href="mailto:roman.potachenski@gmail.com">
            <Image
              src={emailIcon}
              alt="roman potachens>ki - gmail"
            />
          </Link>
        </div>
      </div>
      <div className={styles.rp_info}>
        <p className={styles.copyright}>
          All rights reserved &copy;roman potachenski photography
          &#8226;montreal|toronto&#8226;
          roman.potachenksi@gmail.com|514-573-3527
        </p>
      </div>
    </footer>
  );
};

export default Footer;
