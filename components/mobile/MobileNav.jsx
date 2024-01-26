"use client";
import classes from "@components/mobile/mobile.module.css";
import instIcone from '@public/assets/icons/insta-logo-2.svg'
import emailIcone from '@public/assets/icons/gmail-logo-2.svg'
import Link from "next/link";
import Image from "next/image";

const MobileNav = ({
  links,
  styles,
  dropDown,
  toggleSubmenu,
  mobileMenu,
  showMobileNav,
}) => {
  return (
    <section className={classes.mobile_section}>
      <nav
        className={`${styles.mobile_nav} ${mobileMenu ? styles.active : ""}`}
      >
        {links.map((item) => (
          <div key={item.id}>
            {item.img !== "" && !item.submenu ? (
              <Link
                href={item.to}
                className={styles.aLinks}
                onClick={showMobileNav}
              >
                {item.name}
              </Link>
            ) : null}
            {item.submenu && (
              <div>
                <span
                  className={styles.aLinks}
                  onClick={(e) => toggleSubmenu(e)}
                >
                  {item.name}
                  &nbsp;
                  <i
                    className={`fa ${
                      dropDown ? "fa-angle-up" : "fa-angle-down"
                    } fa-lg`}
                  ></i>
                </span>
                <div
                  className={`${classes.mobileDropbox} ${
                    dropDown ? classes.toggleDropdown : ""
                  }`}
                >
                  {dropDown &&
                    item.submenu.map((submenuItem) => (
                      <Link
                        key={submenuItem.to}
                        href={{ pathname: `/portfolio/[category]` }}
                        as={`/portfolio/${submenuItem.to}`}
                        className={styles.aLinks}
                        onClick={showMobileNav}
                      >
                        {submenuItem.name}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      <footer className={classes.social_media}>
        <div>
          <Link href="https://www.instagram.com/potachenski_photo/?hl=fr-ca">
            <Image
              src={instIcone}
              alt="roman potachenski - instagram link"
            />
          </Link>
        </div>

        <div>
          <Link href="mailto:roman.potachenski@gmail.com">
            <Image
              src={emailIcone}
              alt="roman potachens>ki - gmail"
            />
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default MobileNav;
