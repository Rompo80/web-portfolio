'use client'
import Link from "next/link"
import Image from 'next/image'
import styles from '@components/footer.module.css';
import { useState, useEffect } from 'react'


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.social_media}>
      <div>
        <Link href="https://www.instagram.com/rompo80/?hl=fr-ca"
          ><Image
            src="/assets/icons/insta-logo-2.svg"
            alt="roman potachenski - instagram link"
            width={35} height={35}
        /></Link>
      </div>

      <div>
        <Link href="mailto:roman.potachenski@gmail.com"
          ><Image
            src="/assets/icons/gmail-logo-2.svg"
            alt="roman potachens>ki - gmail"
            width={35} height={35}
        /></Link>
      </div>
    </div>
        <div className={styles.rp_info}>
      <p>
        All rights reserved &copy;roman potachenski photography
        &#8226;montreal|toronto&#8226; roman.potachenksi@gmail.com|514-573-3527
      </p>
    </div>
    </footer>
  )
}

export default Footer