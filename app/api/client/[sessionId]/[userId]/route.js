import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ searchParams }) {
  const sessionId = Number(searchParams.sessionId);
  console.log(sessionId);
  try {
    const images = await prisma.image.findMany({
      where: {
        session: {
          id: 2,
          user_id: 4,
        },
      },
    });

    if (!images) {
      return new NextResponse.JSON(
        { message: "There is no photo session available yet!" },
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return NextResponse.error(`Error getting driver: ${error}`, {
      status: 500,
    });
  }
}
