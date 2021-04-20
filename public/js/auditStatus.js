const formDetails = document.querySelector('.form-details')

function closeForm () {
  formDetails.classList.remove('is-active')
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    formDetails.classList.remove('is-active')
  }
})

async function displayForm (reserveId) {
  formDetails.classList.toggle('is-active')

  const postData = {
    id: reserveId
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
    times.innerHTML = ''
    for (let i = 0; i < reserve.times.length; i++) {
      times.innerHTML = times.innerHTML + reserve.times[i] + '<br>'
    }

    const status = document.querySelector('.status')
    status.textContent = `狀態：${reserve.status}`

    const user = document.querySelector('.user')
    user.textContent = `借用人：${reserve.user}`

    const purpose = document.querySelector('.purpose')
    purpose.textContent = `借用原因：${reserve.purpose}`

    const button = document.querySelector('.form-details button')
    button.onclick = closeForm
  } catch (error) {
    window.alert('資料庫連線異常，請檢查你的網路是否正常，或請稍後再試！')
  }
}
