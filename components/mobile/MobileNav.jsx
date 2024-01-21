"use client";
import classes from "@components/mobile/mobile.module.css";
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
          <Link href="https://www.instagram.com/rompo80/?hl=fr-ca">
            <Image
              src="/assets/icons/insta-logo-2.svg"
              alt="roman potachenski - instagram link"
              width={30}
              height={30}
            />
          </Link>
        </div>

        <div>
          <Link href="mailto:roman.potachenski@gmail.com">
            <Image
              src="/assets/icons/gmail-logo-2.svg"
              alt="roman potachens>ki - gmail"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default MobileNav;
