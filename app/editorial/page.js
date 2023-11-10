"use client"
import classes from "@styles/gallery.module.css";
import images from "@components/ImageLoader";
import Image from "next/image";



const Editorial = () => {
 
return (
   <>
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
      </>
  );
};

export default Editorial;

// const Editorial = async () => {
//   const wedding = await prisma.image.findMany({});

//     return (
//       <section>
//         {wedding.map((img) => (
//           <Image key={img.id} src={img.img_path} alt={img.id} width={100} height={100}/>
//         ))}
//       </section>
//     );
//   };

//   const importAll = (r) => r.keys().map(r);
//   const imageModules = importAll(
//     require.context("@public/assets/img/Editorial", false, /\.(webp)$/)
//   );
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Load the images on the client side
//       const loadedImages = imageModules.map((imageModule) => ({
//         src: imageModule.default,
//         alt: "Editorial",
//       }));
//       setImages(loadedImages);
//     }
//   }, []);

//   console.log(images);
