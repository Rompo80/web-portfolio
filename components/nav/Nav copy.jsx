'use client'
import Link from "next/link"
import Image from 'next/image'
import styles from '@components/nav/nav.module.css'
import { useState, useEffect } from 'react'

const links = [
  {
    to: "/",
    img: "/assets/icons/rp-logo.svg",
    alt: "rp-logo",
    name: "",
    id: "0"
  },
  {
    to: "/about",
    name: "About",
    id: "1"
  },
  {
    to: "/projects",
    name: "Projects",
    id: "2"
  },
  {
    to: "/experience",
    name: "Experience",
    id:"3"
  },
  {
    to: "/education",
    name: "Education",
    id: "4"
  },
]


const inline_css = {
  header:{
		maxWidth: "100%",
  },
  format: {
    padding: "0.5rem 1rem",
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "end",
    
  },
  aLinks: {
    fontSize: "medium",
    textTransform: "uppercase",
    fontFamily: "'Montserrat', sans-serif"
  }
}

const Nav = () => {
  return (
    <header style={inline_css.header}>
    <nav style={inline_css.format}>
         {links.map((link, index) =>(<Link key={link.id} href={link.to} className={index === 0 ? styles.firstLink : ''} style={inline_css.aLinks}>
          {link.name}
            {link.img && (<Image src={link.img} alt={link.alt} width={45} height={45}/>)}
        </Link>
    ))}
        
    </nav>
    </header>
  )
}

export default Nav