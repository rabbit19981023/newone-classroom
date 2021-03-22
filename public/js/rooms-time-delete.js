function getErrorMessage() {
  const urlParams = new URLSearchParams(window.location.search)

  const errorMessage = urlParams.get('message')

  window.alert(errorMessage)
}

function getCol(checkbox) {
  const allTd = document.getElementsByTagName('td')

  let columnIndex = checkbox.parentNode.cellIndex
  for (let i = 0; i < 16; i++) {
    allTd[columnIndex].children[0].disabled = true

    columnIndex = columnIndex + 8
  }
}