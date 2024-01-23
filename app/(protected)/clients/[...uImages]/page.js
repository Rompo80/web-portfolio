import prisma from "@lib/prisma";
import ClientsImg from "@components/ClientsImg";
import classes from '@styles/clients.module.css';
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
  <section className={classes.flex}>
      {images ? (
        images.map((img) => (
          <ClientsImg key={img.id} img={img} userId={userId}/>
        ))
      ) : (
        <h2>The session photos will be uploaded shortly</h2>
      )}
    </section>
  );
};
export default getImages;
