const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const imageData = [
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-3.webp',
    session_id: 1, 
    type_id: 1,    
  },
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-4.webp',
    session_id: 1, 
    type_id: 1,    
  },
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-5.webp',
    session_id: 1, 
    type_id: 1,    
  },
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-6.webp',
    session_id: 1, 
    type_id: 1,    
  },
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-7.webp',
    session_id: 1, 
    type_id: 1,    
  },
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-8.webp',
    session_id: 1, 
    type_id: 1,    
  },
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-9.webp',
    session_id: 1, 
    type_id: 1,    
  },
  {
    img_name: 'Image 1',
    img_path: '/assets/img/wedding_gallery/wedding-10.webp',
    session_id: 1, 
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

