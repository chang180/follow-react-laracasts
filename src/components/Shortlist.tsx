import { use } from "react";
import { LikedContext } from "../context/liked-context";
import { Image } from "../types";
import { Heart, X } from "lucide-react";

export function Shortlist({ images }: { images: Image[] }) {
  const { liked, setLiked } = use(LikedContext);

  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span>Your shortlist</span>
        <Heart className="inline-block size-6 fill-pink-500 stroke-pink-500" />
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {images.filter((img) => liked.includes(img.id)).map((image) => (
          <li className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">
            <img
              height={32}
              width={32}
              alt={image.name}
              className="aspect-square w-8 object-cover"
              src={image.imagePath}
            />
            <p className="px-3 text-sm text-slate-800">{image.name}</p>
            <button className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100">
              <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" onClick={
                () => {
                  setLiked(liked.filter((id) => id !== image.id));
                }
              } />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
