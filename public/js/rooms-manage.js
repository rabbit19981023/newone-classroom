function getErrorMessage () {
	const urlParams = new URLSearchParams(window.location.search)

	const errorMessage = urlParams.get('message')

	if (errorMessage.includes('null') | errorMessage.includes('undefined')) {
    return
  } else {
    window.alert(errorMessage)
  }
}

function doubleCheck (event) {
  event.preventDefault()

  const div = document.getElementById('double-check')

  div.style.display = 'flex'


}


getErrorMessage()