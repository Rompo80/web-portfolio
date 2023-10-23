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
        <a href="https://www.instagram.com/rompo80/?hl=fr-ca"
          ><img
            src="/assets/icons/insta-logo-2.svg"
            alt="roman potachenski - instagram link"
            width="40"
        /></a>
      </div>

      <div>
        <a href="mailto:roman.potachenski@gmail.com"
          ><img
            src="/assets/icons/gmail-logo-2.svg"
            alt="roman potachens>ki - gmail"
            width="40"
        /></a>
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