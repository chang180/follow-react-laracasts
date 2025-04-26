import { Heart, Loader } from "lucide-react";
import { Image } from "../types";
import { useState } from "react";

export function LikeToggle({ image }: { image: Image }) {
    const [pending, setPending] = useState(false);

    return (
        <button className="group" onClick={() => {
            setPending(true);
            // setTimeout(() => {
            //     if (liked.includes(id)) {
            //         setLiked(liked.filter((imageId) => imageId !== id));
            //     } else {
            //         setLiked([...liked, id]);
            //     }
            //     setPending(false);
            // }
            //     , 1000);
        }}>
            {pending ?
                <Loader className="animate-spin stroke-slate-300" /> :
                <Heart
                    className={
                        image.likedBy.includes({ id: 1 }) // Assuming 1 is the current user's ID
                            ? "fill-red-500 stroke-red-500"
                            : "stroke-slate-200 group-hover:stroke-slate-300"
                    } />
            }
        </button>
    );
}