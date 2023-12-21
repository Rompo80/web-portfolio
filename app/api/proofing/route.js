import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const photoSession = await prisma.session.findMany({
        include: {
          image: true,
        },
      });

    if (!photoSession) {
      return new NextResponse.JSON(
        { message: "There is no photo session available yet!" },
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(photoSession), { status: 200 });
  } catch (error) {
    return NextResponse.error(`Error getting driver: ${error}`, {
      status: 500,
    });
  }
}