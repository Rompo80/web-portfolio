import prisma from "../../../lib/prisma"

// POST /api/post
// Required fields in body: title, authorEmail

// Optional fields in body: content
export default async function handle(req, res) {
  const { name, email, address} = req.body
  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      address: address
    //   privilege: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
}