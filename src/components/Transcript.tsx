import { useEffect, useRef } from "react"
import { secondsToHms } from "../utils/functions/time"
import { CaptionType } from "./VideoTranscript"

interface TranscriptProps {
  currentTime: number
  captions: CaptionType[]
  currentCaption: CaptionType | null
}

const Transcript: React.FC<TranscriptProps> = ({ currentTime, captions, currentCaption }) => {
  const activeCaptionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (activeCaptionRef.current) {
      activeCaptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentTime])

  const isActive = (caption: CaptionType) => caption === currentCaption

  return (
    <div className="bg-neutral-100 py-4 rounded-xl">
      <h1 className="px-4 text-2xl font-semibold mb-4">Transcription</h1>
      <div className="max-h-[80vh] flex flex-col gap-4 overflow-y-auto px-4">
       {captions.map((caption: CaptionType) => (
          <div 
            ref={isActive(caption) ? activeCaptionRef : null} key={caption.index} 
            className={`${isActive(caption) ? 'bg-blue-500 bg-opacity-20' : ''} flex gap-4 px-2 py-1 rounded-lg`}  
          >
            <span className="shrink-0 font-medium text-neutral-600">{secondsToHms(caption.start)} - {secondsToHms(caption.end)}</span>
            <span>{caption.text}</span>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Transcript
