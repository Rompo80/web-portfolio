import React from "react";
import Image from "next/image";

const Gallery = ({ images }) => {
  return (
    <>

        {images.map((image, index) => (
          <div key={index}>
            <Image src={image.src} alt={image.alt} />
          </div>
        ))}
  
    </>
  );
};

export default Gallery;
