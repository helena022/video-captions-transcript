interface CaptionProps {
  text: string
}

const Caption: React.FC<CaptionProps> = ({ text }) => {
  return (
    <div className="w-full text-center">
      <span className="px-2 leading-relaxed bg-black rounded-lg bg-opacity-30 text-white text-xl">{text}</span>
    </div>
  )
}

export default Caption
