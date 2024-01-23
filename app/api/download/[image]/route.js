import { readFile } from "fs/promises";
import path from "path";

export async function GET(request) {
  console.log(request.nextUrl.pathname);
  const pathList = request.nextUrl.pathname.split("/");
  const pathString = pathList[pathList.length - 1];
  const pathArr = pathString.split(",");
  const imgName = pathArr[pathArr.length - 1];
  const pathImage = pathArr.join("/");

  const buffer = await readFile(path.join(process.cwd(), "public", pathImage));

  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename=${imgName}`);
  headers.append("Content-Type", "image/png/webp/jpeg");
  console.log(buffer);
  return new Response(buffer, {
    headers,
  });
}
