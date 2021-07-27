export const closeForm = function () {
  const formDetails = document.querySelector('.form-details')
  formDetails.classList.remove('is-active')
}

try {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeForm()
    }
  })

  const closeSpan = document.querySelector('.bi-x-square-fill')
  closeSpan.addEventListener('click', closeForm)

  const closeBtn = document.querySelector('.form-details button[type="button"]')
  closeBtn.addEventListener('click', closeForm)
} catch (error) {  }
