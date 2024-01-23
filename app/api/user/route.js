import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await prisma.user.findUnique({
    where: {
      // email: "kik@gmail.com",
      email: "romanworld@gmail.com",
    },
  });

  if (!user) {
    return new NextResponse.JSON(
      { message: "Cannot find admin with this email" },
      { status: 404 }
    );
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
