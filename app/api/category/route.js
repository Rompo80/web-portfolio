import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return new NextResponse.JSON(
        { message: "No category found" },
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return NextResponse.error(`Error getting categories: ${error}`, {
      status: 500,
    });
  }
}