/** Indicate where the user is in web-roadmap **/
try {
  const navLink = document.querySelectorAll('.nav-link')[2]
  navLink.classList.add('active')
} catch (error) {  }

async function displayForm (reserveId) {
  const formDetails = document.querySelector('.form-details')
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

    const status = document.querySelector('.status')
    status.textContent = `狀態：${reserve.status}`

    const user = document.querySelector('.user')
    user.textContent = `借用人：${reserve.user}`

    const purpose = document.querySelector('.purpose')
    purpose.textContent = `借用原因：${reserve.purpose}`

    if (reserve.result) {
      const result = document.querySelector('.result')
      result.textContent = `審核結果：${reserve.result}`
    }

    const button = document.querySelector('.form-details button')
    button.onclick = closeForm
  } catch (error) {
    window.location.href = '?message=資料庫連線異常，請檢查你的網路是否正常，或請稍後再試！'
  }
}

try {
  const queries = document.querySelectorAll('.query')
  for (let i = 0; i < queries.length; i++) {
    const query = queries[i]
    query.addEventListener('click', () => { displayForm(query.id) })
  }
} catch (error) {  }
