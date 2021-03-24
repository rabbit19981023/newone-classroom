function getErrorMessage () {
  const urlParams = new URLSearchParams(window.location.search)

  const errorMessage = urlParams.get('message')

  if (errorMessage) {
    window.alert(errorMessage)
  }
}

getErrorMessage()