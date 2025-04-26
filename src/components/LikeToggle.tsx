import { Heart, Loader } from "lucide-react";
import { Image } from "../types";
import { Dispatch, SetStateAction, useState } from "react";
import { toggleLikedStatus } from "../queries";

export function LikeToggle({ image, setImages }: { 
    image: Image,
    setImages: Dispatch<SetStateAction<Image[]>> 
}) {
    const [pending, setPending] = useState(false);

    return (
        <button className="group" onClick={ async () => {
            setPending(true);
            const updatedImage = await toggleLikedStatus(image.id);
            setImages((prevImages) => prevImages.map((img) => img.id === updatedImage.id ? updatedImage : img));
            setPending(false);
        }}>
            {pending ?
                <Loader className="animate-spin stroke-slate-300" /> :
                <Heart
                    className={
                        image.likedBy.includes(1) // Assuming 1 is the current user's ID
                            ? "fill-red-500 stroke-red-500"
                            : "stroke-slate-200 group-hover:stroke-slate-300"
                    } />
            }
        </button>
    );
}