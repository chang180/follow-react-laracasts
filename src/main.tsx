import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.js";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { ImageList } from "./components/ImageList";
import { NewImageForm } from "./components/NewImageForm";
import { images as imagesData } from "./data/images";
import { LikedContext } from "./context/liked-context";
import { Image } from "./types";
import { Loader } from "lucide-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export function Main() {
  const [liked, setLiked] = useState<number[]>([1, 3]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>(imagesData);
  return (
    <main>
      <ApiImages />
      <LikedContext value={{ liked, setLiked }}>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist images={images} />
        </div>
        <ImageList images={images} searchQuery={searchQuery} />
      </LikedContext>
      <NewImageForm images={images} setImages={setImages} />
    </main>
  );
}

export function ApiImages() {
  const [apiImages, setApiImages] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function getImages() {
      setIsLoading(true);
      try {
        const response = await fetch("http://laravel12-sail-xdebug.test/api/images");
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message);
          throw errorData;
        }
        const data = await response.json();
        setApiImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to fetch images");
      }
      setIsLoading(false);
    }
    getImages();
  }, [
    // re-run the effect

  ]);

  return (
    <div className="bg-white p-6 mt-12 shadow ring ring-black/5">
      {isLoading && <Loader className="animate-spin stroke-slate-300" />}
      {error && <p className="text-red-500">{error}</p>}
      {!error && !isLoading && <pre>{JSON.stringify(apiImages, null, 2)}</pre>}
    </div>
  );
}
