"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Header from "../components/Header";
import UploadImage from "../components/UploadImage";

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Fetch saved images from the DB on page load
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data: { url: string }[] = await res.json();
        setUploadedImages(data.map((img) => img.url));
      } catch (error) {
        console.error("Error loading images:", error);
      }
    }

    fetchImages();
  }, []);

  const handleNewImage = (url: string) => {
    setUploadedImages((prev) => [url, ...prev]);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="min-h-screen bg-white px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Upload */}
          <div>
            <UploadImage onUploadSuccess={handleNewImage} />
          </div>

          {/* Right Column - Gallery */}
          <div className="bg-teal-50 border border-teal-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Uploaded Gallery
            </h2>
            {uploadedImages.length === 0 ? (
              <p className="text-gray-600">No images uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadedImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative rounded-md border border-teal-200 overflow-hidden">
                    <Image
                      src={url}
                      alt={`upload-${i}`}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                    <a
                      href={url}
                      download
                      className="absolute bottom-1 right-1 bg-teal-600 text-white px-2 py-1 text-xs rounded hover:bg-teal-700">
                      Download
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
