import { type Image } from "../types"; // Import the Image type from the types module
import { LikeToggle } from "./LikeToggle";

export function ImageList({
  images,
}: {
  images: Image[],
}) {
  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} /> // Pass the image prop to ImageCard
      ))}
    </ul>
  );
}

type ImageCardProps = {
  image: Image; // Define the type for the image prop
};

function ImageCard({ image }: ImageCardProps) {

  return (
    <li
      key={image.id}
      className="overflow-clip rounded-lg bg-white shadow-md ring ring-black/5 hover:-translate-y-0.5"
    >
      <img
        className="aspect-square object-cover"
        alt={image.name}
        src={image.imagePath}
      />
      <div className="gap flex items-center justify-between p-4 text-sm">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{image.name}</p>
          <span className="text-slate-300">·</span>
          <p className="text-slate-500">{image.vibe}</p>
        </div>
        <LikeToggle id={ image.id }/>
      </div>
    </li>
  );
}
