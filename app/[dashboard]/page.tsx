"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Header from "../components/Header";
import UploadImage from "../components/UploadImage";

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9; // Adjust as needed
  const totalPages = Math.ceil(uploadedImages.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = uploadedImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

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
      <main className="min-h-screen bg-white px-4 py-4">
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
                {currentImages.map((url, i) => (
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
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-teal-600 text-white rounded disabled:opacity-50">
                Previous
              </button>
              <span className="text-sm text-teal-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-teal-600 text-white rounded disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
