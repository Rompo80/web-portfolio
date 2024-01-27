"use client";
import React, { useState, useEffect } from "react";
import styles from "@styles/page.module.css";
import Image from "next/image";
import image1 from "@public/assets/img/mainpage/editorial-1.webp";
import image2 from "@public/assets/img/mainpage/editorial-8.webp";
import image3 from "@public/assets/img/mainpage/njc004.jpeg";
import image4 from "@public/assets/img/park32_index_web.jpg";

const imgListe = [image1, image2, image3, image4];

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
          <Image
          key={index}
          src={img}
          alt={`main_image ${index + 1}`}
          // className={styles.image}
          className={`${styles.image} ${index === currentIndex ? styles.active : ""}`}
          layout="fill"
          objectFit="cover"
          objectPosition={index === imgListe.length -1 ? "70% 10%": ""}
        />
        // </div>
      ))}
    </section>
  );
};

export default Home;
