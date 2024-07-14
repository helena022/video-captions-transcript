import { CSSProperties } from "react"

interface CaptionProps {
  text: string
  captionSettings: {
    fontSize: number,
    color: string,
    backgroundColor: string
  }
}

const Caption: React.FC<CaptionProps> = ({ text, captionSettings }) => {
  const style: CSSProperties = {
    fontSize: captionSettings.fontSize,
    color: captionSettings.color,
    backgroundColor: captionSettings.backgroundColor,
  }
  return (
    <div className="w-full text-center">
      <span style={style} className="px-2 leading-relaxed bg-black rounded-lg bg-opacity-30">{text}</span>
    </div>
  )
}

export default Caption
