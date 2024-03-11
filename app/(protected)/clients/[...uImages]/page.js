import prisma from "@lib/prisma";
import ClientsImg from "@components/ClientsImg";
import classes from '@styles/clients.module.css';
import FormUpload from "@components/FormUpload";



const getImages = async ({ params }) => {
  const { uImages } = params;
  let userId = parseInt(uImages[1]);
  let sessionId = parseInt(uImages[2]);
  

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
    <FormUpload userId={userId} sessionId={sessionId}/>
      {images.length > 0 ? (
        images.map((img) => ( <>
          <ClientsImg key={img.id} img={img} userId={userId} classes={classes} fill/>
          </>
        ))
      ) : (
        <FormUpload userId={userId} sessionId={sessionId}/>
      )}
    </section>
  );
};
export default getImages;
