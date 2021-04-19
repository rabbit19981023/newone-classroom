async function displayForm (thisSpan) {
  const urlParams = new URLSearchParams(window.location.search)

  const roomName = urlParams.get('room_name')
  const thisTime = thisSpan.parentNode.parentNode.firstElementChild.textContent // span > td > tr > firstChild of tr: td.textContent

  const dateStr = urlParams.get('date')
  const date = new Date(dateStr)
  const dateWeekDay = date.getUTCDay()
  const selectedWeekDay = thisSpan.parentNode.cellIndex - 1
  const selectedDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    (date.getUTCDate() - dateWeekDay) + selectedWeekDay
  ))
  const selectedDateStr = selectedDate.toJSON().split('T')[0]

  const postData = {
    room_name: roomName,
    date: selectedDateStr,
    time: thisTime
  }

  const url = '/api/reserves'
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  }

  try {
    const response = await fetch(url, config)
    const reserve = await response.json()

    const roomName = document.querySelector('.room-name')
    roomName.textContent = `教室：${reserve.room_name}`

    const date = document.querySelector('.date')
    date.textContent = `日期：${reserve.date}`

    const times = document.querySelector('.times')
    times.innerHTML = '時段：<div class="times-DOM"></div>'
    const timesDOM = document.querySelector('.times-DOM')
    for (let i = 0; i < reserve.times.length; i++) {
      timesDOM.innerHTML = timesDOM.innerHTML + reserve.times[i] + ',<br>'
    }

    const user = document.querySelector('.user')
    user.textContent = `借用人：${reserve.user}`

    const purpose = document.querySelector('.purpose')
    purpose.textContent = `借用原因：${reserve.purpose}`
  } catch (error) {
    window.alert('資料庫連線有誤，請檢查你的網路是否正常，或請稍後再試！')
  }
}
