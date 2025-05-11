export const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return `${date.getFullYear()}-${padZero(date.getMonth()+1)}-${padZero(date.getDate())}`
}

const padZero = (num) => {
  return num < 10 ? `0${num}` : num
}