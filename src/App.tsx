import { useState } from "react";
import VideoTranscript from "./components/VideoTranscript"

const CLIPS = [
  {
    label: "Clip 1",
    videoUrl: "/assets/videos/clip_1.mp4",
    captionsUrl: "/assets/captions/captions_1.srt"
  },
  {
    label: "Clip 2",
    videoUrl: "/assets/videos/clip_2.mp4",
    captionsUrl: "/assets/captions/captions_2.srt"
  }
]

function App() {
  const [selectedClip, setSelectedClip] = useState(CLIPS[0])

  return (
    <div className="min-h-screen w-full p-4 bg-neutral-900 min-h-screen">
      <div className="grid gap-4 grid-cols-3 grid-rows-0 lg:grid-rows-6">
        <VideoTranscript
          videoUrl={selectedClip.videoUrl}
          captionsUrl={selectedClip.captionsUrl}
        />
        <div className="col-span-3 row-span-1 mx-auto overflow-hidden lg:col-span-2">
          <div className="flex flex-wrap gap-4">
            {CLIPS.map(clip => 
              <button 
                key={clip.label}
                className={`${clip === selectedClip ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full`}
                onClick={() => setSelectedClip(clip)}
              >
                {clip.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
