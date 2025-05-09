import { StrictMode, use, useState } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.js";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { ImageList } from "./components/ImageList";
import { NewImageForm } from "./components/NewImageForm";
import { LikedContext } from "./context/liked-context";
import { Image } from "./types";
import { getImages } from "./queries";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const imagePromise = getImages();

export function Main() {
  const apiImages = use(imagePromise);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>(apiImages);
  return (
    <main>


      <LikedContext value>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist images={images} setImages={setImages} />
        </div>
        <ImageList images={images} searchQuery={searchQuery} setImages={setImages} />
      </LikedContext>
      <NewImageForm images={images} setImages={setImages} />
    </main>
  );
}
