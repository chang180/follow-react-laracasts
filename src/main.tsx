import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.js";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { ImageList } from "./components/ImageList";
import { NewImageForm } from "./components/NewImageForm";
import { images } from "./data/images";
import { LikedContext } from "./context/liked-context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export function Main() {
  const [liked, setLiked] = useState<number[]>([1, 3]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <main>
      <LikedContext value={{ liked, setLiked }}>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist images={images} />
        </div>
        <ImageList images={images} searchQuery={searchQuery} />
      </LikedContext>
      <NewImageForm />
    </main>
  );
}
