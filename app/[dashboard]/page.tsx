"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setPreviewUrl(data.url);
        toast.success("Upload successful!");
      } else {
        toast.error("Upload failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <Card className="w-full max-w-lg shadow-2xl border-teal-600 border-2 bg-white">
        <CardHeader className="bg-teal-600 text-white rounded-t-md p-6">
          <CardTitle className="text-xl font-semibold text-white text-center">
            Upload an Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <Label
              htmlFor="image"
              className="text-sm text-teal-600 font-medium">
              Choose a file
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="cursor-pointer file:bg-bg-teal-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full bg-teal-600 hover:bg-[#25bfbf] text-white font-semibold">
            {isUploading ? "Uploading..." : "Upload"}
          </Button>

          {previewUrl && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Label className="text-sm text-teal-600 font-medium">
                Preview:
              </Label>
              <Image
                src={previewUrl}
                alt="Uploaded preview"
                className="rounded-md border border-teal-600 max-h-64 w-auto mx-auto"
              />
              <a
                href={previewUrl}
                download
                className="block text-center text-sm text-teal-600 hover:underline">
                Download Image
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
