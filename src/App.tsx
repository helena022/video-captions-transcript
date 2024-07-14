import VideoTranscript from "./components/VideoTranscript"

function App() {
  return (
    <div className="h-screen w-full lg:h-full p-4 bg-neutral-900 min-h-screen">
      <div className="grid grid-cols-3 gap-4">
        <VideoTranscript
          videoUrl="/assets/videos/clip_1.mp4" 
          captionsUrl="/assets/captions/captions_1.srt"
        />
      </div>
    </div>
  );
}

export default App
