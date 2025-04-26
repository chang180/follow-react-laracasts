import { Dispatch, SetStateAction } from "react";
import { Image } from "../types";
import { SubmitButton } from "./SubmitButton";

export function NewImageForm({
  images,
  setImages
}: {
  images: Image[],
  setImages: Dispatch<SetStateAction<Image[]>>
}) {

  return (
    <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
      <form
        action={async (formData: FormData) => {
          // sleep(1000);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const newIndex = images.length + 1;
          // 使用 padStart 確保數字至least有兩位，不足的在前面補0
          const paddedIndex = String(newIndex).padStart(3, '0');

          const newImage: Image = {
            id: newIndex,
            name: formData.get("name") as string,
            vibe: formData.get("trait") as string,
            imagePath: `/images/chihiro${paddedIndex}.jpg`,
            likedBy: [{ id: 1}]
          };
          setImages((prevImages) => [...prevImages, newImage]);
        }}
        className="mt-4 flex w-full flex-col items-start gap-4">
        <div className="grid w-full gap-6 md:grid-cols-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="name"
              type="text"
              name="name"
              required
            />
          </fieldset>
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="trait">Description</label>
            <input
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="trait"
              type="text"
              name="trait"
              required
            />
          </fieldset>
          <fieldset
            disabled
            className="col-span-2 flex w-full cursor-not-allowed flex-col gap-1 opacity-50"
          >
            <label htmlFor="avatar_url">Image file</label>
            <input
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="avatar_url"
              type="file"
              name="avatar_url"
              disabled
            />
          </fieldset>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
