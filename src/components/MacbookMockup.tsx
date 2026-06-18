"use client";
import "./MacbookMockup.css";

export default function MacbookMockup({ image, alt = "preview" }: { image: string; alt?: string }) {
  return (
    <div className="mb-frame">
      <div className="mb-screen">
        <div className="mb-viewport">
          <img src={image} alt={alt} />
        </div>
      </div>
      <div className="mb-base" />
      <div className="mb-notch" />
    </div>
  );
}
