import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const privileges = await prisma.privilege.findMany();
    if (!privileges) {
      return new NextResponse.JSON(
        { message: "No privilege found" },
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(privileges), { status: 200 });
  } catch (error) {
    return NextResponse.error(`Error getting driver: ${error}`, {
      status: 500,
    });
  }
}
