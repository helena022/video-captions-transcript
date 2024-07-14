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

const MENU_ITEMS = [
  {
    name: 'fontSize',
    label: 'Font Size',
    options: [
      {
        label: '50%',
        value: 9
      },
      {
        label: '100%',
        value: 18
      },
      {
        label: '150%',
        value: 28
      },
    ]
  },
  {
    name: 'color',
    label: 'Text Color',
    options: [
      {
        label: 'White',
        value: '#FFFFFF'
      },
      {
        label: 'Black',
        value: '#000000'
      },
      {
        label: 'Yellow',
        value: '#FFFF00'
      },
    ]
  },
  {
    name: 'backgroundColor',
    label: 'Background Color',
    options: [
      {
        label: 'Black',
        value: '#000000'
      },
      {
        label: 'White',
        value: '#FFFFFF'
      },
    ]
  }
]

const VideoTranscription: React.FC<VideoPlayerProps> = ({ videoUrl, captionsUrl }) => {
  const videoRef = useRef<HTMLVideoElement  | null>(null)

  const [currentTime, setCurrentTime] = useState<any>(0)
  const [captions, setCaptions] = useState<CaptionType[] | null>(null)
  const [currentCaption, setCurrentCaption] = useState<CaptionType | null>(null)

  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const [captionSettings, setCaptionSettings] = useState({
    fontSize: 18,
    color: 'white',
    backgroundColor: 'black'
  })

  useEffect(() => {
   fetchCaptions()
  }, [])

  useEffect(() => {
    setCurrentCaption(null)

    fetchCaptions()
   }, [videoUrl])

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

  const toggleSettingsMenu = () => {
    setShowSettings(showSettings  => !showSettings)
  }

  const handleMenuItemClick = (name: string) => {
    if (activeMenuItem === name) {
      setActiveMenuItem(null)
    } else {
      setActiveMenuItem(name)
    }
  }

  const handleCueSettingsChange = (name: string, value: string | number) => {
    setCaptionSettings(prevState => ({
        ...prevState,
        [name]: value
    }))
  }

  return (
    <>
      <div className="col-span-3 lg:col-span-2 lg:row-span-5">
        <div className="relative group h-[30vh] lg:h-[75vh]">
          <video
            src={videoUrl}
            ref={videoRef}
            controls
            width="100%"
            height="auto"
            onTimeUpdate={handleTimeUpdate}
            className="rounded-2xl overflow-hidden h-full bg-black"
          >
            Your browser does not support the video tag.
          </video>
          
          {!!currentCaption &&
            <div className="absolute inset-x-10 bottom-[5%] group-hover:bottom-[10%]">
              <Caption text={currentCaption.text} captionSettings={captionSettings} />
            </div>
          }

          <div className="w-full cursor-pointer absolute top-2 right-2 flex flex-col items-end text-white">
            <div className="hidden p-2 rounded-full bg-black bg-opacity-30 group-hover:block" onClick={() => toggleSettingsMenu()}>
              <svg  
                xmlns="http://www.w3.org/2000/svg"  
                width="24"  
                height="24"  
                viewBox="0 0 24 24"  
                fill="none"  
                stroke="currentColor"  
                strokeWidth="2"  
                strokeLinecap="round"  
                strokeLinejoin="round"  
                className="icon icon-tabler icons-tabler-outline icon-tabler-settings"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>
            </div>
            {showSettings && 
              <>
                <div className="fixed inset-0" onClick={() => toggleSettingsMenu()}></div>
                <div className="hidden z-20 w-1/3 bg-neutral-600 py-2 rounded-xl group-hover:block md:w-1/5">
                  {MENU_ITEMS.map(item =>
                    <div key={`${item.name}`} className="w-full">
                      <div 
                        className={`${activeMenuItem === item.name ? 'bg-neutral-700' : ''} flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-neutral-700`} 
                        onClick={() => handleMenuItemClick(item.name)}
                      >
                        <span className="mb-1">{item.label}</span><svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
                      </div>
                      <ul className={`${activeMenuItem === item.name ? 'flex' : 'hidden'} flex-col gap-1`}>
                        {item.options.map(option =>
                          <li key={`${item.name}-${option.value}`} className="text-neutral-300 px-3 py-1 cursor-pointer hover:bg-neutral-700" onClick={() => handleCueSettingsChange(item.name, option.value)}>&#8226; {option.label}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            }
          </div>
        </div>
      </div>
      <div className="col-span-3 lg:col-span-1 row-span-6">
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
