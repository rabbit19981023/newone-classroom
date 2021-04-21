/** Indicate where the user is in web-roadmap **/
const navLink = document.querySelectorAll('.nav-link')[0]
navLink.classList.add('active')

/** Functions **/
async function displayForm (thisSpan) {
  const formDetails = document.querySelector('.form-details')
  formDetails.classList.toggle('is-active')

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
    const loadingWrapper = document.querySelector('.loading-wrapper')
    loadingWrapper.classList.remove('loaded')

    const response = await fetch(url, config)
    const reserve = await response.json()

    loadingWrapper.classList.add('loaded')

    const roomName = document.querySelector('.room-name')
    roomName.textContent = `教室：${reserve.room_name}`

    const date = document.querySelector('.date')
    date.textContent = `日期：${reserve.date}`

    const times = document.querySelector('.times')
    times.innerHTML = ''
    for (let i = 0; i < reserve.times.length; i++) {
      times.innerHTML = times.innerHTML + reserve.times[i] + '<br>'
    }

    const user = document.querySelector('.user')
    user.textContent = `借用人：${reserve.user}`

    const purpose = document.querySelector('.purpose')
    purpose.textContent = `借用原因：${reserve.purpose}`
  } catch (error) {
    window.alert('資料庫連線異常，請檢查你的網路是否正常，或請稍後再試！')
  }
}

try {
  const spans = document.querySelectorAll('.bi-check-square-fill')
  for (let i = 0; i < spans.length; i++) {
    const span = spans[i]

    span.addEventListener('click', () => {
      displayForm(span)
    })
  }
} catch (error) { }
