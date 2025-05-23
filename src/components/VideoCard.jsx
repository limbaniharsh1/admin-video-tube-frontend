import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import DeleteConfirmationModal from "./DleleteConfirmationModal";

export default function VideoCard({ video, onDelete }) {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});

  const handleDeleteClick = (video) => {
    setSelectedVideo(video);
  };

  const handleConfirmDelete = () => {
    setSelectedVideo({});
  };

  const handleClose = () => {
    setSelectedVideo({});
  };

  return (
    <>
      <div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-video">
          {video.thumbnail ? (
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">No Thumbnail</span>
            </div>
          )}

          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                onClick={() => {
                  alert(`Playing: ${video.title}`);
                }}
              >
                Play Video
              </button>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold line-clamp-1">
              {video.title}
            </h3>
            <button
              onClick={() => handleDeleteClick(video)}
              // onClick={() => onDelete(video.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Delete video"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {video.categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-700 rounded-full"
              >
                {category?.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={Object.keys(selectedVideo)?.length > 0}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        isDeleting={false}
        itemName={selectedVideo?.title}
        itemType="video"
      />
    </>
  );
}
