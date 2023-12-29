"use client";
import React, { useState, useEffect } from "react";
import styles from "@styles/page.module.css";
import Aos from "aos";
import "aos/dist/aos.css";


const slides = [
  {
    src: "/assets/img/11902_index_web.jpg",
    alt: "wedding_gallery_roman potachenski",
  },
  {
    src: "/assets/img/park32_index_web.jpg",
    alt: "wedding_gallery_roman potachenski",
  },
  {
    src: "/assets/img/18048_index_web.jpg",
    alt: "wedding_gallery_roman potachenski",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to update the current slide
  const updateSlide = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  // Use useEffect to set up an interval for changing slides
  useEffect(() => {
    Aos.init({
      duration: 200,
    });
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      updateSlide(nextSlide);
    }, 7000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [currentSlide, slides.length]);

  return (
    <section className={styles.slider}>
      {slides.map((img, index) => (
        <img
          data-aos="fade-up"
          key={index}
          src={img.src}
          alt={img.alt}
          style={{ display: index === currentSlide ? "block" : "none" }}
        />
      ))}
    </section>
  );
};

export default Home;
