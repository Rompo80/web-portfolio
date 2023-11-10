// imageLoader.js
const importAll = (r) => r.keys().map(r);
const imageModules = importAll(require.context("@public/assets/img/Editorial", false, /\.(webp)$/));

const Images = imageModules.map((imageModule, index) => ({
  id: index,
  src: imageModule.default,
  alt: "Editorial",
}));
      
export default Images;
