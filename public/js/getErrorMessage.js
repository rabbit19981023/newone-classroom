function getErrorMessage () {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const errorMessage = urlParams.get('message')

    if (errorMessage) {
      return window.alert(errorMessage)
    }
  } catch (error) {  }
}

getErrorMessage()
