const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const imageData = [
  {
    img_name: 'njc001',
    img_path: '/assets/img/weddings/njc001.jpg',
    session_id: 2, 
    type_id: 1,    
  },
  {
    img_name: 'njc002',
    img_path: '/assets/img/weddings/njc002.jpg',
    session_id: 2, 
    type_id: 1,    
  },
  {
    img_name: 'njc003',
    img_path: '/assets/img/weddings/njc003.jpg',
    session_id: 2, 
    type_id: 1,    
  },
  {
    img_name: 'njc004',
    img_path: '/assets/img/weddings/njc004.jpg',
    session_id: 2, 
    type_id: 1,    
  },
  {
    img_name: 'njc005',
    img_path: '/assets/img/weddings/njc005.jpg',
    session_id: 2, 
    type_id: 1,    
  },
 
]

async function main() {
  console.log(`Start seeding ...`)
  for (const img of imageData) {
    const image = await prisma.image.create({
      data: img,
    })
    console.log(`Created image with id: ${image.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

