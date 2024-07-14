export const timeStringToSeconds = (timeString: string) => {
  let [hhmmss, milliseconds] = timeString.split(',')
  let [hours, minutes, seconds] = hhmmss.split(':').map(parseFloat)

  let totalSeconds = hours * 3600 + minutes * 60 + seconds

  totalSeconds += parseFloat(milliseconds) / 1000

  return totalSeconds
}