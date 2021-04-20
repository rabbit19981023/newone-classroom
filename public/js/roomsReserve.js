/** Global Namespace **/
const urlParams = new URLSearchParams(window.location.search)

/** Check if the reserved day is valid **/
function isValidDate (event) {
  const today = new Date(new Date().setHours(0, 0, 0, 0))

  const dateInput = document.querySelector('#room-date')
  const reserveDay = new Date(dateInput.value)

  if (reserveDay < today) {
    event.preventDefault() // prevent onsubmit before url redirect
    location.href = '?message=請選擇正確的日期！'
  }
}

/** Display the Transparent Div Element for Posting Data **/
const formDetails = document.querySelector('.form-details')

function closeForm () {
  formDetails.classList.remove('is-active')
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    formDetails.classList.remove('is-active')
  }
})

function displayForm () {
  formDetails.classList.toggle('is-active') // check if '.is-active' is already in classlist, add if true, else remove it

  const checkboxes = document.getElementsByName('room_time')
  const timesChecked = []
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      timesChecked.push(checkboxes[i].value)
    }
  }

  const times = document.querySelector('.times')
  times.innerHTML = '' // everytime we display the formDetails, init the value, and do the array loop below
  for (let i = 0; i < timesChecked.length; i++) {
    times.innerHTML = times.innerHTML + timesChecked[i] + '<br>'
  }

  displayInfo()
  appendValuesToInputs()
}

/** Display Fields Values in formDetails **/
function displayInfo () {
  const roomName = document.querySelector('#room_name')
  const date = document.querySelector('#date')

  roomName.textContent = '教室：'
  roomName.textContent = roomName.textContent + urlParams.get('room_name')

  date.textContent = '日期：'
  date.textContent = date.textContent + urlParams.get('date')
}

/** Dynamicallly Appending Fields to Form **/
function appendValuesToInputs () {
  const roomNameInput = document.querySelector('#room_name_input')
  const dateInput = document.querySelector('#date_input')

  roomNameInput.value = urlParams.get('room_name')
  dateInput.value = urlParams.get('date')
}
