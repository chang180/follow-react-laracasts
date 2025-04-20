import { Heart } from "lucide-react";
import * as React from "react";

export function LikeToggle() {
    const [isLiked, setIsLiked] = React.useState(false);
    const [count, setCount] = React.useState(0);

    function handleClick() {
        setIsLiked((prev) => !prev);
        setCount((prev) => (isLiked ? prev - 1 : prev + 1));
    }

    return (
        <button className="group flex items-center gapj-1" onClick={handleClick}>
            <Heart
                className={
                    isLiked
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-slate-200 group-hover:stroke-slate-300"
                } />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                {count}
            </span>
        </button>
    );
}