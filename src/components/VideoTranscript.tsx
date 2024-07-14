import { useRef, useState, useEffect } from 'react'
import { parseSRT } from '../utils/functions/captions'

import Caption from './Caption';
import Transcript from './Transcript';

export type CaptionType = { 
  index: number; 
  start: number; 
  end: number; 
  text: string; 
}

interface VideoPlayerProps {
  videoUrl: string
  captionsUrl: string
}

const VideoTranscription: React.FC<VideoPlayerProps> = ({ videoUrl, captionsUrl }) => {
  const videoRef = useRef<HTMLVideoElement  | null>(null)

  const [currentTime, setCurrentTime] = useState<any>(0)
  const [captions, setCaptions] = useState<CaptionType[] | null>(null)
  const [currentCaption, setCurrentCaption] = useState<CaptionType | null>(null)

  useEffect(() => {
   fetchCaptions()
  }, [])

  useEffect(() => {
    if (!captions) return

    const caption = [...captions].find(caption => currentTime >= caption.start && currentTime < caption.end)

    if (currentCaption === caption) return

    if (!caption) {
      setCurrentCaption(null)
    } else {
      setCurrentCaption(caption)
    }
  }, [currentTime])

  const fetchCaptions = async () => {
    const response = await fetch(captionsUrl)
    const data = await response.text()
    const parsedCaptions = parseSRT(data)

    setCaptions(parsedCaptions)
  }

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef?.current?.currentTime)
  }

  const handleTranscriptClick = (time: number) => {
    if (!videoRef.current) return
    
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }
  
  return (
    <>
      <div className="col-span-2">
        <div className="relative group overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            controls
            width="100%"
            height="auto"
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {!!currentCaption &&
            <div className="absolute inset-x-10 bottom-[5%] group-hover:bottom-[10%]">
              <Caption text={currentCaption.text} />
            </div>
          }
        </div>
      </div>
      <div className="col-span-1">
        {!!captions && 
          <Transcript 
            currentTime={currentTime} 
            captions={captions} 
            currentCaption={currentCaption}
            handleTranscriptClick={handleTranscriptClick} 
          />
        }
      </div>
    </>
  )
}

export default VideoTranscription
