import { Dispatch, SetStateAction, useState } from "react";
import { type Image } from "../types"; // Import the Image type from the types module
import { LikeToggle } from "./LikeToggle";

// 分頁控制組件
function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-cyan-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        上一頁
      </button>
      
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page 
                ? 'bg-cyan-700 text-white' 
                : 'bg-cyan-100 hover:bg-cyan-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-cyan-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        下一頁
      </button>
      
      <span className="ml-2 text-sm text-gray-500">
        第 {currentPage} 頁，共 {totalPages} 頁
      </span>
    </div>
  );
}

export function ImageList({
  images,
  searchQuery,
  setImages
}: {
  images: Image[],
  searchQuery: string;
  setImages:Dispatch<SetStateAction<Image[]>>
}) {
  // 每頁顯示的圖片數量
  const imagesPerPage = 9;
  
  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  
  // 過濾後的圖片
  const filteredImages = images.filter((img) => 
    img.vibe.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // 計算總頁數
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  
  // 獲取當前頁的圖片
  const currentImages = filteredImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );
  
  // 頁面變更處理函數
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滾動到頁面頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentImages.map((image) => (
          <ImageCard key={image.id} image={image} setImages={setImages} />
        ))}
      </ul>
      
      {/* 只有在有多頁時才顯示分頁控制 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      
      {/* 顯示圖片總數和當前顯示的範圍 */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        顯示 {filteredImages.length} 張圖片中的第 {(currentPage - 1) * imagesPerPage + 1} 
        - {Math.min(currentPage * imagesPerPage, filteredImages.length)} 張
      </div>
    </>
  );
}

function ImageCard({ image, setImages }: {
  image: Image; // Define the type of the image prop as Image
  setImages: Dispatch<SetStateAction<Image[]>>; // Define the type of the setImages prop as a function that updates the state of images
}) {

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
        <LikeToggle image={image} setImages={setImages} />
      </div>
    </li>
  );
}