export const timeStringToSeconds = (timeString: string) => {
  let [hhmmss, milliseconds] = timeString.split(',')
  let [hours, minutes, seconds] = hhmmss.split(':').map(parseFloat)

  let totalSeconds = hours * 3600 + minutes * 60 + seconds

  totalSeconds += parseFloat(milliseconds) / 1000

  return totalSeconds
}

export const secondsToHms = (secNum: number) => {
  let hours   = Math.floor(secNum / 3600)
  let minutes = Math.floor(secNum / 60) % 60
  let seconds = Math.round(secNum % 60)

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}
