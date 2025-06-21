import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const blob = await put(file.name, file.stream(), {
    access: "public", // make it publicly viewable
  });

  return NextResponse.json(blob); // blob.url is the image URL
}
