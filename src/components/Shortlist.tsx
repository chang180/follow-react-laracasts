import { Image } from "../types";
import { Heart, Loader, X } from "lucide-react";
import { toggleLikedStatus } from "../queries";
import { Dispatch, SetStateAction, useState } from "react";

export function Shortlist({ images, setImages }: {
  images: Image[],
  setImages: Dispatch<SetStateAction<Image[]>>
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span>Your shortlist</span>
        <Heart className="inline-block size-6 fill-pink-500 stroke-pink-500" />
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {images.filter((img) => img.likedBy.includes(1)).map((image) => (
          <li key={image.id} className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">
            <img
              height={32}
              width={32}
              alt={image.name}
              className="aspect-square w-8 object-cover"
              src={image.imagePath}
            />
            <p className="px-3 text-sm text-slate-800">{image.name}</p>
            <DeleteButton id={image.id} setImages={setImages}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeleteButton({ id, setImages }: { 
  id: Image["id"] ,
  setImages: Dispatch<SetStateAction<Image[]>>
}) {
  const [pending, setPending] = useState(false);
  return (
    <button
      onClick={async () => {
        setPending(true);
        const updatedImage = await toggleLikedStatus(id);
        setImages((prevImages) =>
          prevImages.map((img) => img.id === updatedImage.id ? updatedImage : img)
        );
        setPending(false);
      }}
      className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100"
      disabled={pending}
    >
      {pending ? (
        <Loader className="size-4 animate-spin stroke-slate-300" />
      ) : (
        <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" />
      )}
    </button>
  );
}
