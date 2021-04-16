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
    date.getUTCDate() - (dateWeekDay - selectedWeekDay)
  ))
  const selectedDateStr = selectedDate.toJSON().split('T')[0]

  const postData = {
    room_name: roomName,
    date: selectedDateStr,
    time: thisTime
  }

  const url = '/'
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  }

  try {
    const response = await fetch(url, config)

    console.log(await response.json())
  } catch (error) {
    window.alert('資料庫連線有誤，請檢查你的網路是否正常，或請稍後再試！')
  }
  
}