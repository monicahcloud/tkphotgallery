import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-teal-600 text-white py-6 shadow-md">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">TK Photo Gallery</h1>
        <p className="text-sm md:text-base text-white/90">
          Upload your favorite images to the gallery below. Accepted formats:
          JPG, PNG, and GIF. Max size: 5MB.
        </p>
      </div>
    </header>
  );
}
