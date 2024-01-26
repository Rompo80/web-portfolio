"use client";
import React, { useState, useEffect } from "react";
import styles from "@styles/page.module.css";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
import image1 from "@public/assets/img/mainpage/editorial-1.webp";
import image2 from "@public/assets/img/mainpage/editorial-8.webp";
import image3 from "@public/assets/img/mainpage/njc004.jpeg";

const imgListe = [image1, image2, image3];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to update the current slide
  const updateSlide = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  // Use useEffect to set up an interval for changing slides
  useEffect(() => {
    Aos.init({
      duration: 600,
      easing: "ease-in-sine",
    });
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % imgListe.length;
      updateSlide(nextSlide);
    }, 7000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [currentSlide, imgListe.length]);

  return (
    <section className={styles.slider}>
      {imgListe.map((img, index) => (
        <Image
          key={index}
          data-aos="flip-right"
          src={img}
          alt={img + index}
          className={index === currentSlide ? styles.image : styles.imgNone}
          placeholder="blur"
        />
      ))}
    </section>
  );
};

export default Home;
