"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@public/assets/icons/rp-logo.svg';
import styles from "@components/nav/nav.module.css";
import MobileNav from "@components/mobile/MobileNav";


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
    to: "/proofing",
    name: "Proofing Gallery",
    id: "1",
  },
  {
    to: "/",
    img: logo.src,
    alt: "rp-logo",
    name: "",
    id: "2",
  },
  {
    to: "/about",
    name: "About",
    id: "3",
  },
  {
    to: "/contact",
    name: "Contact",
    id: "4",
  },
];

const Nav = () => {
  const [dropDown, setDropdown] = useState(false);
  const [mobileMenu, setMobile] = useState(false);
  

  

  const showMobileNav = () => {
    setMobile((prev) => !prev)
  };

  const toggleSubmenu = (e) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    let timer;
    if (dropDown) {
      timer = setTimeout(() => {
        setDropdown(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [dropDown]);

  return (
  
    <header className={styles.header}>
      <div
        className={`${styles.overlay} ${mobileMenu ? styles.active : ""}`}
      ></div>
      <nav className={styles.nav}>
        {links.map((link, index) => (
          <div
            key={link.id}
            className={index === 2 ? styles.logo_center : ""}
            onClick={index === 0 ? toggleSubmenu : undefined}
          >
            {link.submenu ? (
              <div className={styles.dropdown}>
                <span className={styles.aLinks}>
                  {link.name}&nbsp;
                  <i
                    className={`fa ${
                      dropDown ? "fa-angle-up" : "fa-angle-down"
                    } fa-sm`}
                  ></i>
                </span>
                <div
                  className={`${styles.dropdownContent} ${
                    dropDown ? styles.showDropdown : ""
                  }`}
                  // onMouseLeave={(e) => toggleSubmenu(e)}
                >
                  {link.submenu.map((submenuItem) => (
                    <Link
                      key={submenuItem.to}
                      href={{ pathname: `/portfolio/[category]`}}
                      as={`/portfolio/${submenuItem.to}`}
                       shallow
                      className={styles.aLinks}
                      onClick={(e) => toggleSubmenu(e)}
                    >
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
              <Link href="/">
                <Image src={link.img} alt={link.alt} width={45} height={45} />
              </Link>
            )}
          </div>
        ))}
      </nav>
      <aside className={styles.aside}>
        <Link href="/" className={styles.div_img}>
         
          <Image
            className={styles.img_logo}
            src={logo}
            alt="rp-logo"
          />
          <span 
          className={styles.author}
          >
           Roman Potachenski
          </span>
        </Link>
        <button className={styles.menu} onClick={showMobileNav}>
          <span
            className={`fa ${!mobileMenu ? "fa-bars" : "fa-times"} fa-2x`}
            aria-label="menu-hamburger"
          ></span>
        </button>
      </aside>
      {mobileMenu && (
        <MobileNav
          dropDown={dropDown}
          links={links}
          styles={styles}
          toggleSubmenu={toggleSubmenu}
          mobileMenu={mobileMenu}
          showMobileNav={showMobileNav}
        />
      )}
    </header>
 
  );
};

export default Nav;
