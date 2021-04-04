function getErrorMessage () {
  const urlParams = new URLSearchParams(window.location.search)
  const errorMessage = urlParams.get('message')

  if (errorMessage) {
    if (errorMessage.includes('null')) {
      window.alert('請選擇要刪除的教室！')
    }

    window.alert(errorMessage)
  }
}

getErrorMessage()
