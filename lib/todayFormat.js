export default function (today) {
  const todayYear = today.getFullYear()
  let todayMonth = today.getMonth() + 1
  let todayDate = today.getDate()

  if (todayMonth < 10) {
    todayMonth = '0' + todayMonth
  }

  if (todayDate < 10) {
    todayDate = '0' + todayDate
  }

  return new Date(todayYear + '-' + todayMonth + '-' + todayDate)
}
