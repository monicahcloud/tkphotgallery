import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload image with unique name suffix
    const blob = await put(file.name, file.stream(), {
      access: "public",
      addRandomSuffix: true,
    });
    const url = blob.url;

    // Save URL to Neon DB
    await query("INSERT INTO images(url) VALUES($1)", [url]);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
