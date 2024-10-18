// CvMosaic.jsx
// Mosaique de cv à partir de CvPreview
import React from "react";

export default function CvMosaic() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="bg-gray-200 h-24 w-32"></div>
      ))}
    </div>
  );
}
