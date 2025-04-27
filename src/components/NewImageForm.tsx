import { Dispatch, SetStateAction, useState } from "react";
import { Image } from "../types";
import { SubmitButton } from "./SubmitButton";
import { addImage } from "../queries";
import { Loader } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

export function NewImageForm({
  images,
  setImages
}: {
  images: Image[],
  setImages: Dispatch<SetStateAction<Image[]>>
}) {
  const [pending, setPending] = useState(false);
  return (
    <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
      <ErrorBoundary fallbackRender={({ error }) => (
        <div className="flex flex-col items-center justify-center gap-4 text-red-500">
          <h2 className="text-lg font-semibold">Error</h2>
          <p>{error.message}</p>
        </div>
      )}>
        <form
          action={async (formData: FormData) => {
            setPending(true);
            const newImage = await addImage(formData);
            setImages((prevImages) => [...prevImages, newImage]);
            setPending(false);
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
                name="vibe"
                required
              />
            </fieldset>
            <fieldset
              className="col-span-2 flex w-full flex-col gap-1"
            >
              <label htmlFor="image">Image file</label>
              <input
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="image"
                type="file"
                name="image"
              />
            </fieldset>
          </div>
          {pending ? (
            <Loader className="h-6 w-6 animate-spin text-cyan-500" />
          ) : (
            <SubmitButton />
          )}
        </form>
      </ErrorBoundary>
    </div>
  );
}
