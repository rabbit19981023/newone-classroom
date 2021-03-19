function getErrorMessage () {
  const urlParams = new URLSearchParams(window.location.search)

  const errorMessage = urlParams.get('message')

  if (errorMessage.includes('null')) {
    window.alert('請選擇要刪除的教室！')
  } else {
    window.alert(errorMessage)
  }
}

function doubleCheck () {
  const div = document.getElementById('double-check')

  div.style.display = 'flex'
}

getErrorMessage()
