const loadingWrapper = document.querySelector('.loading-wrapper')

function loaded () {
  loadingWrapper.classList.add('loaded')
}

document.addEventListener('DOMContentLoaded', loaded)

async function formSubmit (event) {
  event.preventDefault()
  const form = event.target

  loadingWrapper.classList.remove('loaded')

  await fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  })

  loadingWrapper.classList.add('loaded')
}

document.addEventListener('submit', formSubmit)
