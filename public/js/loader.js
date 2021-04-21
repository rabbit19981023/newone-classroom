const loadingWrapper = document.querySelector('.loading-wrapper')

function loaded () {
  loadingWrapper.classList.add('loaded')
}

document.addEventListener('DOMContentLoaded', loaded)

async function formSubmit (event) {
  const form = event.target

  if (form.method.toLowerCase() === 'get') {
    return
  }

  event.preventDefault()

  loadingWrapper.classList.remove('loaded')

  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })

  const result = await response.text()

  window.location.href = `?message=${result}`
}

document.addEventListener('submit', formSubmit)
