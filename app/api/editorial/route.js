import prisma from "../../../lib/prisma"

export default async function handle(req, res) {
  const {id, img_path, session_id, type_id} = req.body
  const result = await prisma.image.create({
    data: {
      id: id,
      img_path: img_path,
      session_id: session_id,
      type_id: type_id
    },
  })
  res.json(result)
}