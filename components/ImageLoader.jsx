
'use server';

import classes from "@styles/gallery.module.css";
import Image from "next/image";




const GetPortfolio = async ({params}) => {
console.log(params);

    const imageContext = require.context(`@public/assets/img/${path}`, false, /\.(webp)$/);
    const images = imageContext.keys().map((key, index) => ({
      id: index,
      src: imageContext(key).default,
      alt: path, // Extract filename without extension
    }));
    console.log(images); 
   
    



    return (
      <main>
        <header className={classes.container_header}>
          <h2>Editorial</h2>
        </header>
        <section className={classes.container_grid}>
          {imgList ? (imgList.map((image) => (
            <div key={image.id}>
              <Image src={image.src} alt={image.alt} />
            </div>
          ))) : (<p>No images</p>)}
        </section>
      </main>
    );



};

export default GetPortfolio;
