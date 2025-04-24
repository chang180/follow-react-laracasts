import { StrictMode, Suspense, use, useEffect, useState } from "react";
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
import { getImages } from "./queries";
import { ErrorBoundary } from "react-error-boundary";

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
      <ErrorBoundary fallbackRender={({ error }) => (
        <div className="bg-red-100 p-6 mt-12 shadow ring ring-black/5">
          <div className="text-red-500">{error.message} : {error.details}</div>
        </div>
      )}>
        <Suspense fallback={
          <div className="bg-green-100 p-6 mt-12 shadow ring ring-black/5">
            <Loader className="animate-spin stroke-slate-300" />
          </div>
        }>
          <ApiImages />
        </Suspense>
      </ErrorBoundary>

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

const imagePromise = getImages();

function ApiImages() {
  const apiImages = use(imagePromise)

  return (
    <div className="bg-green-100 p-6 mt-12 shadow ring ring-black/5">
      <pre>
        {JSON.stringify(apiImages, null, 2)}
      </pre>
    </div>
  );
}
