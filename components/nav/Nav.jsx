'use client'
import Link from "next/link"
import Image from 'next/image'
import styles from '@components/nav/nav.module.css'
import { useState, useEffect } from 'react'

const links = [
  {
    to: "/#",
    name: "Gallery",
    id: "0",
    submenu: [
      { to: "/weddings", name: "Weddings" },
      { to: "/family", name: "Family" },
      { to: "/editorial", name: "Editorial" },
      { to: "/events", name: "Events" },
    ],
  },
  {
    to: "/#",
    name: "Proofing Gallery",
    id: "1"
  },
  {
    to: "/",
    img: "/assets/icons/rp-logo.svg",
    alt: "rp-logo",
    name: "",
    id: "2"
  },
  {
    to: "/about",
    name: "About",
    id:"3"
  },
  {
    to: "/contact",
    name: "Contact",
    id: "4"
  },
]


const Nav = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.format}>
        {links.map((link, index) => (
          <div key={link.id} className={index === 2 ? styles.logo_center : ""}>
            {link.submenu ? (
              <div className={styles.dropdown}>
                <span className={styles.aLinks}>{link.name}&nbsp;<i className="fa fa-caret-down fa-sm"></i></span>
                <div className={styles.dropdownContent}>
                  {link.submenu.map((submenuItem) => (
                    <Link key={submenuItem.to} href={submenuItem.to} className={styles.aLinks}>
                      {submenuItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link href={link.to} className={styles.aLinks}>
                {link.name}
              </Link>
            )}
            {link.img && (
              <Image src={link.img} alt={link.alt} width={45} height={45} />
            )}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Nav