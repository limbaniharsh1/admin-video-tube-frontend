import VideoCard from "./VideoCard";


export default function VideoList({ videos, onDelete }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}
