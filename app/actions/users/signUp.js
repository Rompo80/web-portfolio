'use server';
import prisma from '@lib/prisma';
import bcrypt from 'bcrypt';


export default async function signUp(name, email, password, privilegeId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    if (user) {
      return 'User with that email already exists';
    }
  

   // Check if the privilege with the given ID exists
   const privilege = await prisma.privilege.findUnique({
    where: { id: privilegeId },
  });

  if (!privilege) {
    return 'Invalid privilege ID';
  }


    const passwordHash = await bcrypt.hash(password, 10);
  
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        privilege: {
          connect: { id: privilegeId },
        },
      },
    });

    return 'Successfully created new user!';
  } catch (error) {
    console.error('Error creating user:', error);
    return 'Error creating user';
  }
};
