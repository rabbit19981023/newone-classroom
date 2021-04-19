function closeBtn () {
  currentDivForm.classList.remove('is-active')
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    currentDivForm.classList.remove('is-active')
  }
})

async function displayForm (reserveId) {
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
    times.innerHTML = '時段：<div class="times-DOM"><div>'
    const timesDOM = document.querySelector('.times-DOM')
    for (let i = 0; i < reserve.times.length; i++) {
      timesDOM.innerHTML = timesDOM.innerHTML + reserve.times[i] + ',<br>'
    }

    const status = document.querySelector('.status')
    status.textContent = `狀態：${reserve.status}`

    const user = document.querySelector('.user')
    user.textContent = `借用人：${reserve.user}`

    const purpose = document.querySelector('.purpose')
    purpose.textContent = `借用原因：${reserve.purpose}`

    const radios = document.querySelector('.radios')
    const resultInput = document.querySelector('#result')
    const button = document.querySelector('.result-wrapper button')
    if (reserve.result) {
      radios.style.display = 'none'

      resultInput.readOnly = true
      resultInput.placeholder = reserve.result

      button.type = 'button'
      button.textContent = '確認'
    } else {
      radios.style.display = 'block'

      resultInput.readOnly = false
      resultInput.textContent = ''

      button.type = 'submit'
      button.textContent = '審核'
    }

  } catch (error) {
    window.alert(error)
    window.alert('資料庫連線有誤，請檢查你的網路是否正常，或請稍後再試！')
  }
}