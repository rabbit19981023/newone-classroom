function selectAllCheckboxes () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')

  if (checkboxes[0].checked) {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false
    }
  } else {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true
    }
  }
}
