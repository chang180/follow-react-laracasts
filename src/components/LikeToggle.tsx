import { Heart, Loader } from "lucide-react";
import { Image } from "../types";
import { useLiked } from "../context/liked-context";
import { useState } from "react";

export function LikeToggle({ id }: { id: Image['id'] }) {
    const { liked, setLiked } = useLiked();
    const [pending, setPending] = useState(false);

    return (
        <button className="group" onClick={() => {
            setPending(true);
            setTimeout(() => {
                if (liked.includes(id)) {
                    setLiked(liked.filter((imageId) => imageId !== id));
                } else {
                    setLiked([...liked, id]);
                }
                setPending(false);
            }
                , 1000);
        }}>
            {pending ?
                <Loader className="animate-spin stroke-slate-300" /> :
                <Heart
                    className={
                        liked.includes(id)
                            ? "fill-red-500 stroke-red-500"
                            : "stroke-slate-200 group-hover:stroke-slate-300"
                    } />
            }
        </button>
    );
}