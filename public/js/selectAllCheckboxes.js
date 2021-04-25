export default function () {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]')
  const checkboxes = []

  for (let i = 0; i < allCheckboxes.length; i++) {
    const checkbox = allCheckboxes[i]

    if (!checkbox.disabled) {
      checkboxes.push(checkbox)
    }
  }

  if (checkboxes[0].checked) {
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i]
      checkbox.checked = false
    }
  } else {
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i]
      checkbox.checked = true
    }
  }
}
