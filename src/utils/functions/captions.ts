import { timeStringToSeconds } from './time'

export const parseSRT = (srt: string) => {
  const normalizedContent = srt.trim().replace(/\r\n/g, '\n').replace(/\n{2,}/g, '\n\n')
  const blocks = normalizedContent.split('\n\n')

  const subtitles = blocks.map((block) => {
    const lines = block.split('\n')
    const index = parseInt(lines[0])
    const timeCodes = lines[1].split(' --> ')
    const start = timeStringToSeconds(timeCodes[0].trim())
    const end = timeStringToSeconds(timeCodes[1].trim())
    const text = lines.slice(2).join('\n')

    return {
      index,
      start,
      end,
      text
    }
  })

  return subtitles
}
