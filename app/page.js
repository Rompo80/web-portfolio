"use client";
import React, { useState, useEffect } from "react";
import styles from "@styles/page.module.css";
import Image from "next/image";
import image1 from "@public/assets/img/mainpage/editorial-1.webp";
import image2 from "@public/assets/img/mainpage/editorial-8.webp";
import image3 from "@public/assets/img/mainpage/njc004.jpeg";

const imgListe = [image1, image2, image3];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imgListe.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex();
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <section className={styles.slider}>
      {imgListe.map((img, index) => (
        <div key={index} className={`${styles.imageContainer} ${index === currentIndex ? styles.active : ""}`}>
          <Image
          src={img}
          alt={`main_image ${index + 1}`}
          className={styles.image}
          layout="fill"
          objectFit="contain"
          // objectPosition="40% 20%"
        />
        </div>
      ))}
    </section>
  );
};

export default Home;
