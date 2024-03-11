"use server";
import prisma from "@lib/prisma";
import bcrypt from "bcrypt";

export default async function signUp(name, email, password, privilegeId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return "User with that email already exists";
    }

    // Check if the privilege with the given ID exists
    const privilege = await prisma.privilege.findUnique({
      where: { id: privilegeId },
    });

    if (!privilege) {
      return "Invalid privilege ID";
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        privilege: {
          connect: { id: privilegeId },
        },
      },
    });

    // Create the session for the newly created user
    await prisma.session.create({
      data: {
        title: name, // Use user's name as session title
        user: {
          connect: { id: newUser.id }, // Connect session to the newly created user
        },
      },
    });

    return "Successfully created new user and session!";
  } catch (error) {
    console.error("Error creating user and session:", error);
    return "Error creating user and session";
  }
}
