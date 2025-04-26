import { createContext, Dispatch, SetStateAction, use } from "react";
import { Image } from "../types";

export const LikedContext = createContext<{
}>(null);

export function useLiked() {
    const context = use(LikedContext);
    if (!context) {
        throw new Error("useLiked must be used within a LikedProvider");
    }
    return context;
}