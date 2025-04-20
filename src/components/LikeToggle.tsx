import { Heart } from "lucide-react";
import { Image } from "../types";
import { useLiked } from "../context/liked-context";

export function LikeToggle({ id }: { id: Image['id'] }) {
    const { liked, setLiked } = useLiked();

    return (
        <button className="group" onClick={() => {
            if (liked.includes(id)) {
                setLiked(liked.filter((imageId) => imageId !== id));
            } else {
                setLiked([...liked, id]);
            }
        }}>
            <Heart
                className={
                    liked.includes(id)
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-slate-200 group-hover:stroke-slate-300"
                } />
        </button>
    );
}