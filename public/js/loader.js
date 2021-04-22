function loaded () {
  const loadingWrapper = document.querySelector('.loading-wrapper')
  loadingWrapper.classList.add('loaded')
}

window.addEventListener('DOMContentLoaded', loaded)

async function formSubmit (event) {
  const form = event.target

  if (form.method.toLowerCase() === 'get') {
    return
  }

  event.preventDefault()

  const loadingWrapper = document.querySelector('.loading-wrapper')
  loadingWrapper.classList.remove('loaded')

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form)
    })
  
    let result = await response.text()
  
    if (result[0] === '<') {
      result = '等待伺服器回應過長(30秒限制)，但資料持續更新中！'
    }
  
    window.location.href = '?message=' + result
  } catch (error) {
    window.location.href = '?message=資料庫連線異常，請檢查你的網路是否正常，或請稍後再試！'
  }
}

document.addEventListener('submit', formSubmit)
