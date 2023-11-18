import prisma from "../../../lib/prisma"


export default async function handle(req, res) {
  const { name, email, address} = req.body
  const result = await prisma.user.create({
    data: {
      name: name,
      email: email,
      address: address,
      password
      
    },
  })
  res.json(result)
}