import VideoTranscription from "./components/VideoTranscription"

function App() {
  return (
    <div className="w-full h-full p-4 bg-neutral-900 min-h-screen">
      <div className="grid grid-cols-3 gap-4 p-4">
        <VideoTranscription
          videoUrl="/assets/videos/clip_2.mp4" 
          captionsUrl="/assets/captions/captions_2.srt"
        />
      </div>
    </div>
  );
}

export default App
