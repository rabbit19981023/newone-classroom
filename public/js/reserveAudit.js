/** Assign a Unique ID to Every div.form-details **/
const divForms = document.querySelectorAll('.form-details')

for (let i = 0; i < divForms.length; i++) {
  divForms[i].id = 'form-details-' + (i + 1)
}

/** Display/Hidden the Transparent Div Element According to its Table Row Index **/
let currentRow, currentDivForm, currentQueryId, currentInputs, currentFirstRadio, currentSecondRadio, currentResult

function displayForm (thisSpan) {
  currentRow = thisSpan.parentNode.parentNode.rowIndex
  currentQueryId = `#form-details-${currentRow}`
  currentDivForm = document.querySelector(currentQueryId)

  try {
    currentInputs = document.querySelectorAll(`${currentQueryId} .input-wrapper input`)

    currentFirstRadio = currentInputs[0]
    currentFirstRadio.id = 'auditSuccess'

    currentSecondRadio = currentInputs[1]
    currentSecondRadio.id = 'auditFailed'

    currentResult = currentInputs[2]
    currentResult.id = 'result'
  } catch { }

  currentDivForm.classList.toggle('is-active')
}

function closeBtn () {
  currentDivForm.classList.remove('is-active')

  try {
    currentFirstRadio.removeAttribute('id')
    currentSecondRadio.removeAttribute('id')
    currentResult.removeAttribute('id')
  } catch { }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    currentDivForm.classList.remove('is-active')

    try {
      currentFirstRadio.removeAttribute('id')
      currentSecondRadio.removeAttribute('id')
      currentResult.removeAttribute('id')
    } catch { }
  }
})
