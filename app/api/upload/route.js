import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import prisma from "@lib/prisma";


export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = parseInt(searchParams.get('sessionId'));
  const categoryId = parseInt(searchParams.get('categoryId'));

  const formData = await request.formData();
  const files = formData.getAll("file");
  const uploadedImages = [];


  for (const file of files) {
    const filename = file.name;

    const blob = await put(filename, file, {
      access: 'public',
    });

    const imageData = {
      img_name: blob.pathname,
      img_path: blob.url,
      session_id: sessionId,
      type_id: categoryId,
    };

    const image = await prisma.image.create({
      data: imageData,
    });

    uploadedImages.push(image);
  }

  return NextResponse.json({uploadedImages});
}
