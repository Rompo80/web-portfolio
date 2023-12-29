import prisma from "@lib/prisma";

const getImages = async ({ params }) => {
  const { uImages } = params;
  let userId = parseInt(uImages[1]);
  let sessionId = parseInt(uImages[2]);
  let userName = decodeURIComponent(uImages[0]);

  if (!sessionId || !userId) {
    sessionId = "";
    userId = "";
  }

  const images = await prisma.image.findMany({
    where: {
      session: {
        id: sessionId,
        user_id: userId,
      },
    },
  });

  return (
    <>
      <h1>Welcome {userName}</h1>
      <section>
        {images ? (
          images.map((img) => (
            <img key={img.id} src={img.img_path} alt={img.name} />
          ))
        ) : (
          <h2>The session photos will be uploaded shortly</h2>
        )}
      </section>
    </>
  );
};
export default getImages;
