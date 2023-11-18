"use client"
import classes from "@styles/gallery.module.css";
import images from "@components/ImageLoader";
import Image from "next/image";



const Editorial = () => {
 
return (
   <main>
      <header className={classes.container_header}>
        <h2>Editorial</h2>
      </header>

      <section className={classes.container_grid}>
        {images.map((image) => (
          
          <div key={image.id}>
            <Image src={image.src} alt={image.alt} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Editorial;


