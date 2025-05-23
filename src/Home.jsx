import { useEffect, useState } from "react";
import Header from "./components/Header";
import VideoList from "./components/VideoList";
import AddVideoModal from "./components/AddVideoModal";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideoThunk, uploadVideoThunk } from "./store/videos/thunk";

export default function Home() {
  const { data } = useSelector((store) => store.Videos);
  console.log(data);
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const addVideo = (video) => {
    // setVideos([...videos, { ...video, id: Date.now().toString() }]);
    // setIsModalOpen(false);
    // dispatch(uploadVideoThunk(video));
  };
  

  const deleteVideo = (id) => {
    // setVideos(videos.filter((video) => video.id !== id));
  };

  useEffect(() => {
    if (!data?.length > 0) {
      dispatch(getAllVideoThunk());
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Layout btnContent="Add Video" onAddClick={() => setIsModalOpen(true)}>
        <main className="container mx-auto px-4 py-8">
          {data?.length > 0 ? (
            <VideoList videos={data} onDelete={deleteVideo} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <h2 className="text-2xl font-bold mb-4">No videos added yet</h2>
              <p className="text-gray-400 mb-6">
                Click the Add Video button to get started
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
              >
                Add Your First Video
              </button>
            </div>
          )}
        </main>
      </Layout>
      <AddVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addVideo}
      />
    </div>
  );
}
