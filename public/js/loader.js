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

  await fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })

  loadingWrapper.classList.add('loaded')
}

document.addEventListener('submit', formSubmit)
