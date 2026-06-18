import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dhinesh — Full Stack & Mobile Developer",
    short_name: "Dhinesh",
    description: "Full-stack freelancer specializing in web, mobile & cloud solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a1a1a",
    icons: [
      { src: "/logo.webp", sizes: "192x192", type: "image/webp" },
      { src: "/logo.webp", sizes: "512x512", type: "image/webp" },
    ],
  };
}
