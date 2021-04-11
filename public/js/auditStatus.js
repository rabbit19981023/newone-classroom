/** Assign a Unique ID to Every div.form-details **/
const divForms = document.querySelectorAll('.form-details')

for (let i = 0; i < divForms.length; i++) {
  divForms[i].id = 'form-details-' + (i + 1)
}

/** Global Namespace **/
let currentRow, currentDivForm, currentQueryId

/** Display/Hidden the Transparent Div Element According to its Table Row Index **/
function displayForm (thisSpan) {
  currentRow = thisSpan.parentNode.parentNode.rowIndex
  currentQueryId = `#form-details-${currentRow}`
  currentDivForm = document.querySelector(currentQueryId)

  currentDivForm.classList.toggle('is-active')
}

function closeBtn () {
  currentDivForm.classList.remove('is-active')
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    currentDivForm.classList.remove('is-active')
  }
})